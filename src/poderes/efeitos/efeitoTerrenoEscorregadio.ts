import { Efeito } from "../efeito.js";

export class EfeitoTerrenoEscorregadio extends Efeito {
    constructor() {
        super("Terreno Escorregadio", 1);
    }

    override getBonusDeslocamento(): number {
        return -3;
    }
}