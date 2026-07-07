import { Habilidade } from "../../poderes/habilidades.js"
import { Caracteristica } from "../../poderes/caracteristica.js";
import { TipoAtributo } from "../atributos/atributos.js";
import { Beneficio } from "../../poderes/beneficio.js";

export abstract class Raca {
    constructor(
        protected nome: string,
    ) {}

    getNome(): string {
        return this.nome;
    }

    abstract getResumo(): string;
    
    abstract getBonusForca(): number;
    abstract getBonusDestreza(): number;
    abstract getBonusConstituicao(): number;
    abstract getBonusInteligencia(): number;
    abstract getBonusSabedoria(): number;
    abstract getBonusCarisma(): number;

    abstract getCaracteristicasRaciais(): Caracteristica[];
    abstract getBeneficiosRaciais(): Beneficio[];
    abstract getHabilidadesRaciais(): Habilidade[];
    
    abstract precisaEscolherBonus(): boolean;
    abstract getAtributosProibidos(): TipoAtributo[];
}