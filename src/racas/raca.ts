import { Habilidade } from "../poderes/habilidades.ts"
import { CaracteristicaRacial } from "./caracteristicasRaciais/caracteristicaRacial.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";
import { BeneficioRacial } from "./beneficioRacial/beneficioRacial.ts";

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

    abstract getCaracteristicasRaciais(): CaracteristicaRacial[];
    abstract getBeneficiosRaciais(): BeneficioRacial[];
    abstract getHabilidadesRaciais(): Habilidade[];
    
    abstract precisaEscolherBonus(): boolean;
    abstract getAtributosProibidos(): TipoAtributo[];
}