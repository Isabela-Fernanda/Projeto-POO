import { Efeito } from "../efeito.ts";

export class EfeitoTerrenoEscorregadio extends Efeito {
    constructor() {
        super("Terreno Escorregadio", 1);
    }

    override getBonusDeslocamento(): number {
        return -3;
    }
}