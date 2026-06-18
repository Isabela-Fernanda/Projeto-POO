import { Efeito } from "../efeito.ts";
import { Condicao } from "../../combate/tipoCondicao.ts";

export class EfeitoTeia extends Efeito {
    constructor(
        duracao: number
    ) {
        super("Teia", duracao, [Condicao.ENREDADO]);
    }

    override getBonusDeslocamento(): number {
        return -999;
    }
}