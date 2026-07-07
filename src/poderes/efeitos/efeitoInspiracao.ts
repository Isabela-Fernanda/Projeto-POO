import { Efeito } from "../efeito.js";

export class EfeitoInspiracao extends Efeito {
    constructor(){
        super(
            "Inspiração",
            10
        );
    }

    override getBonusAtaque(): number {
        return 1;
    }
}