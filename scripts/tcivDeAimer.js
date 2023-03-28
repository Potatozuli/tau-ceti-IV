Hooks.once("preUpdateToken", (token) => { //Movement de-aiming
    const lastPosX = token.x;
    const lastPosY = token.y;
    console.log("Beep got positions")
    console.log(lastPosX)
    let freeMove = 1;
    if(token.actor.system.props.Mobile == 1 && Number(token.actor.system.props.Agility) > 1){
        freeMove = Number(token.actor.system.props.Agility);
    }
    Hooks.once("updateToken", () => {
        const distMoved = Math.floor(Math.sqrt(Math.pow((lastPosX - token.x)/canvas.grid.size, 2) + Math.pow((lastPosY - token.y)/canvas.grid.size, 2))) - 1;
        if(distMoved > freeMove){
            token.actor.update({"system.props.IsAimed": 0}); //De-aims player if they move more than free movement
        }
    });
});

