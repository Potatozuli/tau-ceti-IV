Hooks.on("combatRound", () => { //Updates for the start of combat rounds
    console.log(canvas.tokens.placeables);
    for (changedToken of canvas.tokens.placeables){
        if(changedToken.actor.system.props.Stunned == 1 && Number(changedToken.actor.system.props.Current_Health) > 0){
            checkedToken.actor.update({"system.props.Stunned": 0});
            checkedtoken.toggleEffect("icons/svg/blind.svg", {active: false, overlay: true});
        }
        if(changedToken.actor.system.props.EnteredFire == 1){
            checkedToken.actor.update({"system.props.EnteredFire": 0});
        }
    }
})