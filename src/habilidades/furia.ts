import { Personagem } from "../personagens/personagem.ts";
import { Efeito } from "./efeito.ts";

export class EfeitoFuria extends Efeito {
    constructor() {
        super("Fúria", 3, 0, 2, -2);
    }

}