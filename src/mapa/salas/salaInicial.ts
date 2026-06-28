import { Mapa } from "../mapa.ts";
import { Luminosidade, Sala, TipoAmbiente } from "../sala.ts";

import { Mesa, ResultadoInteracao } from "../catalogoObjetos.ts";
import { Bau } from "../catalogoObjetos.ts";
import { Estante } from "../catalogoObjetos.ts";
import { Portal } from "../catalogoObjetos.ts";

import { GeradorInicial } from "../../criacao/gerarItens.ts";

import { Jogador } from "../../personagens/jogador.ts";

export class SalaInicial {
    construir(mapa: Mapa, jogador: Jogador): void {
        const sala = new Sala("Câmara do Despertar", TipoAmbiente.NORMAL, Luminosidade.ILUMINADO, 0, 0, 10, 10)
        mapa.adicionarSala(sala);

        const gerador = new GeradorInicial();
        const itens = gerador.gerar(jogador);

        mapa.posicionarEntidade(jogador, 5, 7);
        jogador.setSalaAtual(sala)

        mapa.adicionarObjeto(new Mesa(3, 3, itens.mesa));

        mapa.adicionarObjeto(new Bau(5, 3, itens.bau));

        mapa.adicionarObjeto(new Estante(7, 3, itens.estante));

        mapa.adicionarObjeto(new Portal("Portal Tutorial", 5, 1, ResultadoInteracao.ENTRAR_MASMORRA));
    }
}