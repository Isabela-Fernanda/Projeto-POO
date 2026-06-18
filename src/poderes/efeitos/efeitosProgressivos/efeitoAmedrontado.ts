import { Efeito } from "../../efeito.ts";
import { Condicao } from "../../../combate/tipoCondicao.ts";

import { EfeitoAbalado } from "./efeitoAbalado.ts";

export class EfeitoAmedrontado extends Efeito {
    constructor(rodadas: number) {
        super("Amedrontado", rodadas, [Condicao.AMEDRONTADO]);

        this.proximoEfeito = new EfeitoAbalado(10);
    }
}