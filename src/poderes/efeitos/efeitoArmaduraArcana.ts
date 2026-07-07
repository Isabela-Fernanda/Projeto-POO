import { Efeito } from "../efeito.js";

export class EfeitoArmaduraArcana extends Efeito {
    constructor() {
        super("Armadura Arcana", 10);
    }

    override getBonusDefesa(): number {
        return 4;
    }
}