import {
    tcivAttackB
} from "./scripts/tcivAttackB.mjs";

Hooks.once('ready', () => {
    console.log("beep seting up")
    console.log(tcivAttackB)
    game.modules.get("tau-ceti-iv").api = {
        tcivAttackB
    }
});