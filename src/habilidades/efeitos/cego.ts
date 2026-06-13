import { Efeito } from "../efeito.ts";
import { Condicao } from "../../combate/tipoCondicao.ts";

export class Cego extends Efeito {
    constructor() {
        super("Cego", 1, [Condicao.CEGO]);
    }

    override getBonusAtaque(): number {
        return -5;
    }
}