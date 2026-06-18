import { Efeito } from "../../efeito.ts";
import { Condicao } from "../../../combate/tipoCondicao.ts";

export class EfeitoAbalado extends Efeito {
    constructor(rodadas: number) {
        super("Abalado", rodadas, [Condicao.AMEDRONTADO]);
    }
}