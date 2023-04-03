import {
    tcivAttackB
} from ".scripts/tcivAttackB.mjs";

Hooks.once("setup", () => {
    console.log("beep seting up")
    console.log(tcivAttackB)
    game.modules.get("tau-ceti-iv").api = {
        tcivAttackB
    }
});