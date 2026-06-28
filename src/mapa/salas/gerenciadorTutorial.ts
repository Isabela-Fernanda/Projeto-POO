import { Mapa } from "../mapa.ts";
import { Jogador } from "../../personagens/tiposPersonagem/jogador.ts";

import { SalaInicial } from "./salaInicial.ts";
import { MasmorraTutorial } from "./masmorraTutoria.ts";
import { ResultadoInteracao } from "../catalogoObjetos.ts";

export enum EstadoTutorial {
    SALA_INICIAL,
    MASMORRA,
    CONCLUIDO
}

export class GerenciadorTutorial {
    private estado: EstadoTutorial;

    constructor(
        private mapa: Mapa,
        private jogador: Jogador,
    ) {
        this.estado = EstadoTutorial.SALA_INICIAL;
    }

    iniciar(): void {
        const salaInicial = new SalaInicial();

        salaInicial.construir(this.mapa, this.jogador);
    }

    processarInteracao(resultado: ResultadoInteracao): void {
        switch (resultado) {
            case ResultadoInteracao.ENTRAR_MASMORRA:
                this.entrarNaMasmorra();
                break;
        }
    }

    entrarNaMasmorra(): void {
        this.estado = EstadoTutorial.MASMORRA;

        this.mapa.limparObjetos();
        this.mapa.limparSalas();

        const masmorra = new MasmorraTutorial();

        masmorra.construir(this.mapa, this.jogador);

        console.log("Você entrou na Masmorra Tutorial.");
    }

    concluirTutoria(): void {
        this.estado = EstadoTutorial.CONCLUIDO;

        console.log("Tutorial concluído.");
    }

    getEstado(): EstadoTutorial {
        return this.estado;
    }
}