import { Raca } from "./raca.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { CaracteristicaRacial } from "./caracteristicasRaciais/caracteristicaRacial.ts";
import { BeneficioRacial } from "./beneficioRacial/beneficioRacial.ts";
import { HerancaDivina } from "./caracteristicasRaciais/catalogoCaracteristicasRaciais.ts";
import { LuzSagrada } from "./beneficioRacial/catalogoBeneficiosRaciais.ts";


export class Aggelus extends Raca {
    constructor() {
        super("Aggelus");
    }

    getBonusForca(): number {
        return 0;
    }
    getBonusDestreza(): number {
        return 0;
    }
    getBonusConstituicao(): number {
        return 0;
    }
    getBonusInteligencia(): number {
        return 0;
    }
    getBonusSabedoria(): number {
        return 4;
    }
    getBonusCarisma(): number {
        return 2;
    }

    getBeneficiosRaciais(): BeneficioRacial[] {
        return [
            new LuzSagrada()
        ]
    }
    getCaracteristicasRaciais(): CaracteristicaRacial[] {
        return [
            new HerancaDivina()
        ]
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}