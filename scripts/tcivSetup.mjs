import {
    tcivAttackB
} from "./scripts/tcivAttackB.mjs";

Hooks.once("setup", () => {
    game.modules.get("tau-ceti-iv").api = {
        tcivAttackB
    }
})

