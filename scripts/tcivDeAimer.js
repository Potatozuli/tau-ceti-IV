Hooks.on("preUpdateToken", (token, updates) => { //Movement de-aiming
    if((updates.x ?? updates.y) && (token.actor.system.props.IsAimed == 1)){ //If the player has moved
        const aimPosX = Number(token.actor.system.props.Aimed_X);
        const aimPosY = Number(token.actor.system.props.Aimed_Y);
        const newPosX = updates.x ?? token.x;
        const newPosY = updates.y ?? token.y;
        let freeMove = 1;
        if(token.actor.system.props.Mobile == 1 && Number(token.actor.system.props.Agility) > 1){
            freeMove = Number(token.actor.system.props.Agility); //Sets freeMove to Agility if actor has the Mobile trait
        }

        let waypointArray = [...token.combatant.flags.dragRuler.passedWaypoints, {x: newPosX, y: newPosY}]; //Puts all points in an array
        console.log(waypointArray)
        let distMoved = 0;
        for(let i = waypointArray.length-1; i >= 1; i--){ //For every drag ruler waypoint, from end to start
            distMoved += Math.floor(Math.hypot(waypointArray[i].x - waypointArray[i-1].x, waypointArray[i].y - waypointArray[i-1].y)/canvas.grid.size); //Add distance from last point
            console.log(distMoved)
            if(waypointArray[i].x == aimPosX && waypointArray[i].y == aimPosY){
                console.log("beep");
                break; //If the current dragruler waypoint is equal to the aimed position (Indicating that that's where the player Aimed last), break out
            }
        }
        console.log(distMoved)
        if(distMoved > freeMove){
            token.actor.update({"system.props.IsAimed": 0}); //De-aims player if they move more than free movement from last aimed point
            warpgate.mutate(canvas.tokens.get(token.actor.system.props.Aimed_Target).document, {token: {overlayEffect: ""}}, {permanent: true, alwaysAccept: true}); //Removes aimed symbol from previous target
            ui.notifications.info("Lost aim from movement!");
        }
    }
})