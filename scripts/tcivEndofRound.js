Hooks.on("combatRound", () => { //Updates for the start of combat rounds
    console.log(canvas.tokens.placeables);
    for (changedToken of canvas.tokens.placeables){
        console.log("Beep 1");
        if(changedToken.actor.Stunned == 1 && Number(changedToken.actor.Current_Health) > 0){
            console.log("beep");
            checkedToken.actor.update({"system.props.Stunned": 0});
            checkedtoken.toggleEffect("icons/svg/blind.svg", {active: false, overlay: true});
        }
        if(changedToken.actor.EnteredFire == 1){
            checkedToken.actor.update({"system.props.EnteredFire": 0});
        }
    }
})