Hooks.on("preUpdateToken", (token, updates) => { //Movement de-aiming
    if(updates.x ?? updates.y){
        const lastPosX = Number(token.actor.system.props.Aimed_X);
        const lastPosY = Number(token.actor.system.props.Aimed_Y);
        const newPosX = updates.x ?? token.x;
        const newPosY = updates.y ?? token.y;
        let freeMove = 1;
        if(token.actor.system.props.Mobile == 1 && Number(token.actor.system.props.Agility) > 1){
            freeMove = Number(token.actor.system.props.Agility);
        }
        const distMoved = Math.floor(Math.hypot(lastPosX - newPosX, lastPosY - newPosY)/canvas.grid.size);
        if(distMoved > freeMove){
            token.actor.update({"system.props.IsAimed": 0}); //De-aims player if they move more than free movement
            warpgate.mutate(token.actor.system.props.Aimed_Target.document, {token: {overlayEffect: ""}}); //Removes target from previously aimed target
            ui.notifications.info("Lost aim from movement!");
        } else if(distMoved <= freeMove) {
            token.actor.update({"system.props.Aimed_X": newPosX, "system.props.Aimed_Y": newPosY}); //If player did not move more than free movement, update last aim pos
        }
    }
})