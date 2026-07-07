import { Efeito } from "../efeito.js";

export class EfeitoMarcaDaPresa extends Efeito {
    constructor(){
        super("Marca da Presa", 999);
    }

    override getBonusDano(): number {
        return 1;
    }
}