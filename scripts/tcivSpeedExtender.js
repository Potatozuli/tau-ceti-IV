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
				{range: baseSpeed + (baseSpeed % 2), color: "Move"},
                {range: baseSpeed*2 + + (baseSpeed % 2), color: "Dash"},
                {range: Math.floor(baseSpeed*2.5) + (Math.floor(baseSpeed*2.5) % 2), color: "Dashx2"},
			]

            return ranges
        }
    }

    dragRuler.registerModule("taucetiiv", tcIVSpeedExtender)
})