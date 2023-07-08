Hooks.on("preUpdateToken", (token, updates) => { //Movement de-aiming
    if((updates.x ?? updates.y) && (token.actor.system.props.IsAimed == 1)){ //If the player has moved
        let freeMove = 1;
        if(token.actor.system.props.Mobile == 1 && Number(token.actor.system.props.Agility) > 1){
            freeMove = Number(token.actor.system.props.Agility); //Sets freeMove to Agility if actor has the Mobile trait
        }
        // const aimPosX = Number(token.actor.system.props.Aimed_X);
        // const aimPosY = Number(token.actor.system.props.Aimed_Y);
        // const lastPosX = token.x + canvas.grid.size/2; //Get last position of token
        // const lastPosY = token.y + canvas.grid.size/2;
        // let newPosX = updates.x ?? token.x; //Get new position of token
        // console.log(updates.x)
        // let newPosY = updates.y ?? token.y;
        // console.log(updates.y)
        // newPosX += canvas.grid.size/2; //Makes updated positions in the center
        // newPosY += canvas.grid.size/2;
        
        

        // //Actually check if free movement has been used yet and other movement

        // let waypointArray = [...token.combatant.flags.dragRuler.passedWaypoints, {x: lastPosX, y: lastPosY}, {x: newPosX, y: newPosY}]; //Puts all points in an array
        // console.log(waypointArray)
        // let distMoved = 0;
        // for(let i = waypointArray.length-1; i >= 1; i--){ //For every drag ruler waypoint, from end to start
        //     distMoved += Math.floor(Math.hypot(waypointArray[i].x - waypointArray[i-1].x, waypointArray[i].y - waypointArray[i-1].y)/canvas.grid.size); //Add distance from last point
        //     console.log(distMoved)
        //     console.log(waypointArray[i].x)
        //     if(waypointArray[i-1].x == aimPosX && waypointArray[i-1].y == aimPosY){
        //         console.log("beep");
        //         break; //If the waypoint measured to is equal to the aimed position (Indicating that that's where the player Aimed last), break out
        //     }
        // }
        // console.log(distMoved)
        let newPosX = updates.x ?? token.x; //Get new position of token
        let newPosY = updates.y ?? token.y;
        const distMoved = Math.floor(Math.hypot(token.x - newPosX, token.y - newPosY)/canvas.grid.size);
        if(distMoved > freeMove){
            console.log("beep")
            token.actor.update({"system.props.IsAimed": 0}); //De-aims player if they move more than free movement from last aimed point
            if(canvas.scene.tokens.get(token.actor.system.props.Aimed_Target) !== undefined){
                warpgate.mutate(canvas.tokens.get(token.actor.system.props.Aimed_Target).document, {token: {overlayEffect: ""}}, {permanent: true, alwaysAccept: true}); //Removes aimed symbol from previous target
            }
            ui.notifications.info("Lost aim from movement!");
        }
    }
});