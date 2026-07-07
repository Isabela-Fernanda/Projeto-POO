import { Efeito } from "../efeito.js";
import { Condicao } from "../../combate/tipoCondicao.js";

export class EfeitoControlarPlantas extends Efeito {
    constructor(
        duracao: number
    ) {
        super("Controlar Plantas", duracao, [Condicao.ENREDADO]);
    }

    override getBonusDeslocamento(): number {
        return -999;
    }
}