import { Efeito } from "../efeito.ts";

export class EfeitoNevoaCondicao extends Efeito {
    constructor() {
        super("Penalidade de Névoa", 1);
    }

    override getBonusPercepcao(): number {
        return -5;
    }
}