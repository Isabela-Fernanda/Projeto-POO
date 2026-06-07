import { Atributos } from "../personagens/atributos/atributos.ts";
import { Habilidade } from "../habilidades/habilidades.ts"

export abstract class Raca {
    constructor(
        protected nome: string,
        protected bonusForca: number,
        protected bonusDestreza: number,
        protected bonusConstituicao: number,
        protected bonusInteligencia: number,
        protected bonusSabedoria: number,
        protected bonusCarisma: number
    ) {}

    getNome(): string {
        return this.nome;
    }
    getBonusForca(): number {
        return this.bonusForca;
    }
    getBonusDestreza(): number {
        return this.bonusDestreza;
    }
    getBonusConstituicao(): number {
        return this.bonusConstituicao;
    }
    getBonusInteligencia(): number {
        return this.bonusInteligencia;
    }
    getBonusSabedoria(): number {
        return this.bonusSabedoria;
    }
    getBonusCarisma(): number {
        return this.bonusCarisma;
    }

    abstract getHabilidadesRaciais():
        Habilidade[];
}