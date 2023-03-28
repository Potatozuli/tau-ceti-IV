Hooks.once("preUpdateToken", () => { //Movement de-aiming
    const lastPosX = token.x;
    const lastPosY = token.y;
    let freeMove = 1;
    if(token.actor.system.props.Mobile && token.actor.system.props.Agility > 1){
        freeMove = token.actor.system.props.Agility;
    }
    Hooks.once("updateToken", () => {
        distMoved = Math.floor(Math.sqrt(Math.pow((lastPosX - token.x)/canvas.grid.size, 2) + Math.pow((lastPosY - token.y)/canvas.grid.size, 2))) - 1;
        if(distMoved > freeMove){
            token.actor.update({"system.props.IsAimed": 0}); //De-aims player if they move more than free movement
        }
    });
});

