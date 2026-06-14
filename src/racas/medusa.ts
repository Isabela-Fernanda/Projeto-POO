import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { CaracteristicaRacial } from "./caracteristicasRaciais/caracteristicaRacial.ts";
import { BeneficioRacial } from "./beneficioRacial/beneficioRacial.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { CriaDeMegalokk, ResistenciaVenenosa } from "./caracteristicasRaciais/catalogoCaracteristicasRaciais.ts";
import { NaturezaVenenosa, OlharAtordoante } from "./habilidadesRaca/catalogoHabilidadesRaciais.ts";

export class Medusa extends Raca {
    constructor() {
        super("Medusa");
    }

    getBonusForca(): number {
        return 0;
    }
    getBonusDestreza(): number {
        return 4;
    }
    getBonusConstituicao(): number {
        return 0;
    }
    getBonusInteligencia(): number {
        return 0;
    }
    getBonusSabedoria(): number {
        return 0;
    }
    getBonusCarisma(): number {
        return 2;
    }

    getBeneficiosRaciais(): BeneficioRacial[] {
        return [];
    }

    getCaracteristicasRaciais(): CaracteristicaRacial[] {
        return [
            new CriaDeMegalokk(),
            new ResistenciaVenenosa()
        ];
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new NaturezaVenenosa(),
            new OlharAtordoante()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}