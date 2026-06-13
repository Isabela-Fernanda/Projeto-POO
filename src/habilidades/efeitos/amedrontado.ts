import { Efeito } from "../efeito.ts";
import { Condicao } from "../../combate/tipoCondicao.ts";

export class Amedrontado extends Efeito {
    constructor(){
        super("Amedrontado", 3, [Condicao.AMENDROTADO]);
    }

    override getBonusAtaque(): number {
        return -2;
    }
}