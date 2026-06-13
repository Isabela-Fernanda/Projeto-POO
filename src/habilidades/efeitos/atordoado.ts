import { Efeito } from "../efeito.ts";
import { Condicao } from "../../combate/tipoCondicao.ts";

export class Atordoado extends Efeito {
    constructor(){
        super("Atordoado", 1, [Condicao.ATORDOADO]);
    }

    override podeAgir(): boolean{
        return false;
    }
}