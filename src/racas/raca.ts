import { Atributos } from "../personagens/atributos/atributos.ts";
import { Habilidade } from "../habilidades/habilidades.ts"

export abstract class Raca {
    constructor(
        protected nome: string,
    ) {}

    getNome(): string {
        return this.nome;
    }

    abstract aplicarBonus(
        atributos: Atributos,
    ): void;

    abstract getHabilidadesRaciais():
        Habilidade[];
}