import { Mapa } from "../mapa.js";
import { Luminosidade, Sala, TipoAmbiente } from "../sala.js";

import { Mesa, ResultadoInteracao } from "../catalogoObjetos.js";
import { Bau } from "../catalogoObjetos.js";
import { Estante } from "../catalogoObjetos.js";
import { Portal } from "../catalogoObjetos.js";

import { GeradorInicial } from "../../criacao/gerarItens.js";

import { Jogador } from "../../personagens/tiposPersonagem/jogador.js";

export class SalaInicial {
    construir(mapa: Mapa, jogador: Jogador): void {
        const sala = new Sala("Câmara do Despertar", TipoAmbiente.NORMAL, Luminosidade.ILUMINADO, 0, 0, 10, 10);
        
        sala.descobrir();

        mapa.adicionarSala(sala);

        const gerador = new GeradorInicial();
        const itens = gerador.gerar(jogador);

        jogador.setSalaAtual(sala);
        mapa.definirPosicaoInicial(5, 7);
        mapa.definirRotacaoInicial(Math.PI);
        mapa.posicionarEntidade(jogador, 5, 7);

        mapa.adicionarObjeto(new Mesa(3, 3, itens.mesa));

        mapa.adicionarObjeto(new Bau(5, 3, itens.bau));

        mapa.adicionarObjeto(new Estante(7, 3, itens.estante));

        mapa.adicionarObjeto(new Portal("Portal Tutorial", 5, 1, ResultadoInteracao.ENTRAR_MASMORRA));
    }
}