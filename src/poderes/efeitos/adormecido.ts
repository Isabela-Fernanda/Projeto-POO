import { Efeito } from "../efeito.ts";
import { Condicao } from "../../combate/tipoCondicao.ts";

export class Adormecido extends Efeito {
    constructor(){
        super("Adormecido", 999, [Condicao.INCONSCIENTE]);
    }

    override podeAgir(): boolean{
        return false;
    }
}