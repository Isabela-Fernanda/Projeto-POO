import { GeradorEncontros } from "../../criacao/geradorEncontros.ts";
import { Jogador } from "../../personagens/jogador.ts";
import {Mapa} from "../mapa.ts";
import { Sala } from "../sala.ts";

export class MasmorraTutorial {
    construir(mapa: Mapa, jogador: Jogador): void {
        mapa.limparObjetos();
        mapa.limparSalas();

        mapa.adicionarSala(new Sala("Entrada da Masmorra", 0, 0, 20, 20));

        GeradorEncontros.criarEncontroBasico(mapa);

        jogador.setPosicao(5, 10);
    }
}