import { Jogador } from "../personagens/tiposPersonagem/jogador.ts";
import { ResultadoInteracao } from "./catalogoObjetos.ts";

export abstract class Objeto {
    constructor(
        protected nome: string,
        protected x: number,
        protected y: number,
        private bloqueiaMovimento: boolean,
        private bloqueiaVisao: boolean,
    ) { }

    getNome(): string {
        return this.nome;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    setPosicao(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    getBloqueiaMovimento(): boolean {
        return this.bloqueiaMovimento;
    }

    getBloqueiaVisao(): boolean {
        return this.bloqueiaVisao;
    }

    abstract interagir(jogador: Jogador): ResultadoInteracao;
}