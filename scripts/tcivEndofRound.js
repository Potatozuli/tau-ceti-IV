Hooks.on("updateCombat", (combat) => { //Updates for the start of combat round
    if(game.user.isGM){
        if(combat.round > combat.previous.round) { //Whenever the combat round number increases
            for (changedToken of canvas.tokens.placeables){ //For all tokens on scene
                if(Number(changedToken.actor.system.props.Current_Health) <= 0 && changedToken.document.disposition < 1 && changedToken.inCombat == true) {
                    
                    canvas.scene.deleteEmbeddedDocuments("Token", [changedToken.id])
                }
                if(changedToken.actor.system.props.EnteredFire == 1){
                    changedToken.actor.update({"system.props.EnteredFire": 0});
                }
            }
            for(let checkedTemplate of canvas.scene.templates){ //For all templates on scene
                if(Tagger.hasTags(checkedTemplate, "Smoke, Fire", {matchAny: true})){ //For templates with either Smoke or Fire tag
                    let tags = Tagger.getTags(checkedTemplate); //Get tags
                    let type = tags[0];
                    let roundsLeft = tags[1].replace(/\D/g, ""); //Find rounds left in second tag
                    roundsLeft--;
                    if(roundsLeft == 0){
                        canvas.scene.deleteEmbeddedDocuments("MeasuredTemplate", [checkedTemplate.id]); //Deletes template if out of time
                    } else {
                        Tagger.setTags(checkedTemplate, [type, `RoundsLeft: ${roundsLeft}`]);
                    }
                }
            }
        }
        for(changedCombatant of combat.combatants){
            if(changedCombatant.resource <= 0){
                if(canvas.scene.tokens.get(changedCombatant.actor.system.props.Aimed_Target) !== undefined){
                    warpgate.mutate(canvas.tokens.get(changedCombatant.actor.system.props.Aimed_Target).document, {token: {overlayEffect: ""}}, {permanent: true, alwaysAccept: true}); //Removes aimed symbol from previous target
                }
                if(changedCombatant.disposition <= 0) changedToken.combatant.token.delete(); //Deletes a combatant if it is dead and an enemy
            }
        }

        for(let effect of combat.combatant.actor.effects){ //Deletes stunned, blind, and deaf effects 
            if(effect.label == "Stunned" || effect.label == "Blind" || effect.label == "Deaf") combat.combatant.actor.deleteEmbeddedDocuments("ActiveEffect", effect.id)
        }
        combat.combatant.update({flags: {dragRuler: {passedWaypoints: []}}}); //Clears dragruler waypoints on turn
        if(combat.combatant.actor.system.props.Stance == "Dashing"){
            combat.combatant.actor.update({"system.props.Stance": "Standing"}); //Sets stance to Standing if was Dashing
        }

    }
});