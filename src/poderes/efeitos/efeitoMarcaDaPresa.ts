import { Efeito } from "../efeito.ts";

export class EfeitoMarcaDaPresa extends Efeito {
    constructor(){
        super("Marca da Presa", 999);
    }

    override getBonusDano(): number {
        return 1;
    }
}