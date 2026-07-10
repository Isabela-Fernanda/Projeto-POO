import { Mapa } from "@mapa/mapa.js";
import { Jogador } from "@personagens/tiposPersonagem/jogador.js";

export class Campanha {
    private readonly jogador: Jogador;
    private readonly mapa: Mapa;

    private iniciada = false;

    private nivelAtual = 1;
    private tempoJogado = 0;
    private salasVisitadas = 0;
    private inimigosMortos = 0;
    private tesourosEncontrados = 0;

    constructor(jogador: Jogador) {
        this.jogador = jogador;
        this.mapa = new Mapa();
    }

    getJogador(): Jogador {
        return this.jogador;
    }

    getMapa(): Mapa {
        return this.mapa;
    }


    foiIniciada(): boolean {
        return this.iniciada
    }

    marcarIniciada(): void {
        this.iniciada = true;
    }
}