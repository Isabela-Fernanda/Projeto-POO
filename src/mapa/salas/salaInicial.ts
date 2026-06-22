import { Mapa } from "../mapa.ts";
import { Sala } from "../sala.ts";

import { Mesa } from "../catalogoObjetos.ts";
import { Bau } from "../catalogoObjetos.ts";
import { Estante } from "../catalogoObjetos.ts";
import { Portal } from "../catalogoObjetos.ts";

import { GeradorInicial } from "../../criacao/gerarItens.ts";

import { Jogador } from "../../personagens/jogador.ts";

export class SalaInicial {
    construir(mapa: Mapa, jogador: Jogador): void {
        mapa.adicionarSala(new Sala("Câmara do Despertar", 0, 0, 10, 10));

        const gerador = new GeradorInicial();
        const itens = gerador.gerar(jogador);

        mapa.posicionarEntidade(jogador, 5, 7);

        mapa.adicionarObjeto(new Mesa(3, 3, itens.mesa));

        mapa.adicionarObjeto(new Bau(5, 3, itens.bau));

        mapa.adicionarObjeto(new Estante(7, 3, itens.estante));

        mapa.adicionarObjeto(new Portal("Portal Tutorial", 5, 1));
    }
}