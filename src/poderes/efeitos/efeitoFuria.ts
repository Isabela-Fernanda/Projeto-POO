import { Efeito } from "../efeito.ts";

export class EfeitoFuria extends Efeito {
    constructor(nivel: number) {
        super("Fúria", 999);
        this.pvTemp = nivel * 2;
    }

    override getBonusAtaque(): number {
        return 2;
    }

    override getBonusDano(): number {
        return 2;
    }
}