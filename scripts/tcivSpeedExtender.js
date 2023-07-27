Hooks.once("dragRuler.ready", (SpeedProvider) => {
    class tcIVSpeedExtender extends SpeedProvider {
        get colors() {
            return [
                //{id: "Free", default: 0x00FF00, name: "tcIV.speeds.Free"},
                {id: "Move", default: 0xFFFF00, name: "tcIV.speeds.Move"},
                {id: "Dash", default: 0xFF8000, name: "tcIV.speeds.Dash"}
            ]
        }

        getRanges(token) {
            const baseSpeed = Number(token.actor.system.props.Speed)
            //let freeMove = 1;
            //if(token.actor.system.props.Mobile == 1 && Number(token.actor.system.props.Agility) > 1){
            //    freeMove = Number(token.actor.system.props.Agility);
            //}

			const ranges = [
				//{range: freeMove, color: "Free"},
				{range: (baseSpeed), color: "Move"},
                {range: (baseSpeed + 5), color: "Dash"}
			]

            return ranges
        }
    }

    dragRuler.registerModule("taucetiiv", tcIVSpeedExtender)
})