import {
    tcivAttackB
} from "./tcivAttackB.mjs";

Hooks.once("setup", () => {
    game.modules.get("tau-ceti-iv").api = {
        tcivAttackB
    }
})

