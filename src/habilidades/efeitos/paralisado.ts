import { Efeito } from "../efeito.ts";
import { Condicao } from "../../combate/tipoCondicao.ts";

export class Paralisado extends Efeito {
    constructor(){
        super("Paralisado", 2, [Condicao.PARALISADO]);
    }

    override podeAgir(): boolean{
        return false;
    }
}