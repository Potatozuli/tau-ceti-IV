Hooks.once("dragRuler.ready", (SpeedProvider) => {
    class tcIVSpeedExtender extends SpeedProvider {
        get colors() {
            return [
                //{id: "Free", default: 0x00FF00, name: "tcIV.speeds.Free"},
                {id: "Move", default: 0xFFFF00, name: "tcIV.speeds.Move"},
                {id: "Dash", default: 0xFF8000, name: "tcIV.speeds.Dash"},
                {id: "Dashx2", default: 0xFF8000, name: "tcIV.speeds.Dashx2"}
            ]
        }

        getRanges(token) {
            const baseSpeed = Number(token.actor.system.props.Speed)

			const ranges = [
				//{range: freeMove, color: "Free"},
				{range: (Math.ceil((baseSpeed*2)/2)), color: "Move"},
                {range: (Math.ceil((baseSpeed*4)/2)), color: "Dash"},
                {range: (Math.ceil((baseSpeed*5)/2)), color: "Dashx2"},
			]

            return ranges
        }
    }

    dragRuler.registerModule("taucetiiv", tcIVSpeedExtender)
})