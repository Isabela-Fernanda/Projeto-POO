import { Efeito } from "../efeito.ts";

export class EfeitoArmaduraArcana extends Efeito {
    constructor() {
        super("Armadura Arcana", 10);
    }

    override getBonusDefesa(): number {
        return 4;
    }
}