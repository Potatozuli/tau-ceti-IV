Hooks.on("updateCombat", (update) => { //Updates for the start of combat rounds
    if(update.round > update.previous.round) {
        for (changedToken of canvas.tokens.placeables){
            if(changedToken.actor.system.props.Stunned == 1 && Number(changedToken.actor.system.props.Current_Health) > 0){
                changedToken.actor.update({"system.props.Stunned": 0});
                changedToken.toggleEffect("icons/svg/blind.svg", {active: false, overlay: true});
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
});