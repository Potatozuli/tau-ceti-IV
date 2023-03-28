Hooks.on("preUpdateToken", (token, updates) => { //Movement de-aiming
    const lastPosX = token.x;
    const lastPosY = token.y;
    const newPosX = updates.x;
    const newPosY = updates.y;
    let freeMove = 1;
    if(token.actor.system.props.Mobile == 1 && Number(token.actor.system.props.Agility) > 1){
        freeMove = Number(token.actor.system.props.Agility);
    }
    const distMoved = Math.floor(Math.sqrt(Math.pow((lastPosX - newPosX)/canvas.grid.size, 2) + Math.pow((lastPosY - newPosY)/canvas.grid.size, 2))) - 1;
    if(distMoved > freeMove){
        token.actor.update({"system.props.IsAimed": 0}); //De-aims player if they move more than free movement
    }
});

