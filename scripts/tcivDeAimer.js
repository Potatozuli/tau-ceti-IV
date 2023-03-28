Hooks.on("preUpdateToken", (token, updates) => { //Movement de-aiming
    const lastPosX = token.x;
    const lastPosY = token.y;
    const newPosX = updates.x ?? token.x;
    const newPosY = updates.y ?? token.y;
    console.log(lastPosX)
    console.log(lastPosY)
    console.log(newPosX)
    console.log(newPosY)
    let freeMove = 1;
    if(updates.x ?? updates.y){
        console.log("Fuck you")
        if(token.actor.system.props.Mobile == 1 && Number(token.actor.system.props.Agility) > 1){
            freeMove = Number(token.actor.system.props.Agility);
        }
        console.log(freeMove)
        const distMoved = Math.floor(Math.sqrt(Math.pow((lastPosX - newPosX)/canvas.grid.size, 2) + Math.pow((lastPosY - newPosY)/canvas.grid.size, 2))) - 1;
        console.log(distMoved)
        if(distMoved > freeMove){
            token.actor.update({"system.props.IsAimed": 0}); //De-aims player if they move more than free movement
            console.log("Fuck your aim")
        }
    }
})