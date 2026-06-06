import { Raca } from "../racas/raca.ts";
import { Atributos } from "./atributos/atributos.ts";
import { Inventario } from "../inventario/inventario.ts";
import { Equipamento } from "../inventario/equipamento.ts";
import { Pericia } from "../habilidades/pericia.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { CalculadoraDano } from "../combate/calcularDano.ts";

export abstract class Personagem {
    protected vidaAtual: number;
    protected manaAtual: number;

    constructor(
        protected nome: string,
        protected nivel: number,
        protected raca: Raca,
        protected atributos: Atributos,
        protected defesa: number,
        protected vidaMaxima: number,
        protected manaMaxima: number,
        protected inventario: Inventario,
        protected equipamento: Equipamento,
        protected pericias: Map< Pericia, number >,
        protected habilidades: Habilidade[],
    ) {
        this.vidaAtual = vidaMaxima;
        this.manaAtual = manaMaxima;
    }

    abstract atacar(alvo?: Personagem): void;
    
    receberDano(dano: number): void {
        this.vidaAtual -= dano;
        if (this.vidaAtual < 0) {
            this.vidaAtual = 0;
        }
    }

    estaVivo(): boolean {
        return this.vidaAtual > 0;
    }

    getNome(): string {
        return this.nome;
    }

    getNivel(): number {
        return this.nivel;
    }

    getVidaAtual(): number {
        return this.vidaAtual;
    }

    getVidaMaxima(): number {
        return this.vidaMaxima;
    }

    getManaAtual(): number {
        return this.manaAtual;
    }

    getManaMaxima(): number {
        return this.manaMaxima;
    }

    getAtributos(): Atributos {
        return this.atributos;
    }

    getForca(): number {
        return this.atributos.getForca();
    }

    getDefesa(): number {
        return this.defesa;
    }

}