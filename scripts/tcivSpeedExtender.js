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

			// A character can always walk it's base speed and dash twice it's base speed
			const ranges = [
				{range: 1, color: "Free"},
				{range: baseSpeed + 1, color: "Move"},
                {range: baseSpeed*2 + 1, color: "Movex2"}
			]

			// Characters that aren't wearing armor are allowed to run with three times their speed
			//if (!token.actor.data.isWearingArmor) {
			//	ranges.push({range: baseSpeed * 3, color: "dash"})
			//}

            return ranges
        }
    }

    dragRuler.registerModule("tau-ceti-iv", tcIVSpeedExtender)
})