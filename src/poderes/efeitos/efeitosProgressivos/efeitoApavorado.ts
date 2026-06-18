import { Efeito } from "../../efeito.ts";
import { Condicao } from "../../../combate/tipoCondicao.ts";

import { EfeitoAmedrontado } from "./efeitoAmedrontado.ts";

export class EfeitoApavorado extends Efeito {
    constructor(rodadas: number) {
        super("Apavorado", rodadas, [Condicao.APAVORADO]);

        this.proximoEfeito = new EfeitoAmedrontado(10);
    }
}