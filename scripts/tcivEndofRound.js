Hooks.on("combatRound", () => { //Updates for the start of combat rounds
    for (changedToken of canvas.tokens.placeables){
        if(changedToken.actor.Stunned == 1 && Number(changedToken.actor.Current_Health) > 0){
            checkedToken.actor.update({"system.props.Stunned": 0});
            checkedtoken.toggleEffect("icons/svg/blind.svg", {active: false, overlay: true});
        }
        if(changedToken.actor.EnteredFire == 1){
            checkedToken.actor.update({"system.props.EnteredFire": 0});
        }
    }
})