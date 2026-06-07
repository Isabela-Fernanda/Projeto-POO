import { Atributos } from "../personagens/atributos/atributos.ts";
import { Habilidade } from "../habilidades/habilidades.ts"

export abstract class Raca {
    constructor(
        protected nome: string,
    ) {}

    getNome(): string {
        return this.nome;
    }
    
    abstract getBonusForca(): number;
    abstract getBonusDestreza(): number;
    abstract getBonusConstituicao(): number;
    abstract getBonusInteligencia(): number;
    abstract getBonusSabedoria(): number;
    abstract getBonusCarisma(): number;

    abstract getHabilidadesRaciais():
        Habilidade[];
}