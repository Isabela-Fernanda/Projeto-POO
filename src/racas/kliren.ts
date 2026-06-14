import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { CaracteristicaRacial } from "./caracteristicasRaciais/caracteristicaRacial.ts";
import { BeneficioRacial } from "./beneficioRacial/beneficioRacial.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { Hibrido, LogicaGnomica, OssosFrageis, Vanguardista } from "./beneficioRacial/catalogoBeneficiosRaciais.ts";

export class Kliren extends Raca {
    constructor() {
        super("Kliren");
    }

    getBonusForca(): number {
        return -2;
    }
    getBonusDestreza(): number {
        return 0;
    }
    getBonusConstituicao(): number {
        return 0;
    }
    getBonusInteligencia(): number {
        return 4;
    }
    getBonusSabedoria(): number {
        return 0;
    }
    getBonusCarisma(): number {
        return 2;
    }
    getBeneficiosRaciais(): BeneficioRacial[] {
        return [
            new Hibrido(),
            new LogicaGnomica(),
            new OssosFrageis(),
            new Vanguardista()
        ];
    }

    getCaracteristicasRaciais(): CaracteristicaRacial[] {
        return [];
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