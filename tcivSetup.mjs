import {
    tcivAttackB
} from ".scripts/tcivAttackB.mjs";

Hooks.once("init", () => {
    console.log("beep seting up")
    console.log(tcivAttackB)
    game.modules.get("tau-ceti-iv").api = {
        tcivAttackB
    }
});