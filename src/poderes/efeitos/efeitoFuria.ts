import { Efeito } from "../efeito.js";

export class EfeitoFuria extends Efeito {
    constructor(nivel: number) {
        super("Fúria", 999);
    }

    override getBonusAtaque(): number {
        return 2;
    }

    override getBonusDano(): number {
        return 2;
    }
}