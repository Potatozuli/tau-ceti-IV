Hooks.once("dragRuler.ready", (SpeedProvider) => {
    class tcIVSpeedExtender extends SpeedProvider {
        get colors() {
            return [
                {id: "Free", default: 0x00FF00, name: "tcIV.speeds.Free"},
                {id: "Move", default: 0xFFFF00, name: "tcIV.speeds.Move"},
                {id: "Movex2", default: 0xFF8000, name: "tcIV.speeds.Movex2"}
            ]
        }

        getRanges(token) {
            const baseSpeed = token.actor.system.props.Speed
            let freeMove = 1;
            if(token.actor.system.props.Mobile && token.actor.system.props.Agility > 1){
                freeMove = token.actor.system.props.Agility;
            }

			// A character can always walk it's base speed and dash twice it's base speed
			const ranges = [
				{range: freeMove, color: "Free"},
				{range: baseSpeed + freeMove, color: "Move"},
                {range: baseSpeed*2 + freeMove, color: "Movex2"}
			]

            return ranges
        }
    }

    dragRuler.registerModule("tau-ceti-iv", tcIVSpeedExtender)
})