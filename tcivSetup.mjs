import {
    tcivAttackB
} from "./functions/tcivAttackB.mjs";

Hooks.once("setup", () => {
    console.log("Tau Ceti IV Initializing")
    console.log(tcivAttackB)
    game.modules.get("taucetiiv").api = tcivAttackB
});