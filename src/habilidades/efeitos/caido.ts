import { Efeito } from "../efeito.ts";
import { Condicao } from "../../combate/tipoCondicao.ts";

export class Caido extends Efeito {
    constructor() {
        super("Caído", 999, [Condicao.CAIDO]);
    }

    override getBonusAtaque(): number {
        return -5;
    }

    override getBonusDefesa(): number {
        return -5;
    }
}