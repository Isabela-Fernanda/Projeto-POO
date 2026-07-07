import { Mapa } from "@mapa/mapa.js";
import { Jogador } from "@personagens/tiposPersonagem/jogador.js";

export class Campanha {
    constructor(jogador: Jogador){
        this.jogador = jogador;
        this.mapa = new Mapa();
    }

    private iniciada = false;

    foiIniciada(): boolean {
        return this.iniciada
    }

    marcarIniciada(): void {
        this.iniciada = true;
    }
    
    jogador!: Jogador;
    mapa!: Mapa;
    nivelAtual = 1;
    tempoJogado = 0;
    salasVisitadas = 0;
    inimigosMortos = 0;
    tesourosEncontrados = 0;
}