import { Mapa } from "../mapa/mapa.ts";

import { FabricaMonstros } from "./fabricaDeMonstros.ts";
import { CatalogoMonstros } from "../personagens/inimigo/catalogoMonstros.ts";

export class GeradorEncontros {
    static criarEncontroBasico(mapa: Mapa): void {
        const goblin = FabricaMonstros.criar(
            CatalogoMonstros.GOBLIN
        );

        mapa.posicionarEntidade(goblin, 10, 10);
    }
}