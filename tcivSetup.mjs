import {
    tcivAttackB
} from ".scripts/tcivAttackB.mjs";
console.log("beep seting up")
console.log(tcivAttackB)
Hooks.once("setup", () => {
    game.modules.get("tau-ceti-iv").api = {
        tcivAttackB
    }
});