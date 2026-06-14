import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { CaracteristicaRacial } from "./caracteristicasRaciais/caracteristicaRacial.ts";
import { BeneficioRacial } from "./beneficioRacial/beneficioRacial.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { Reptiliano, SangueFrio } from "./beneficioRacial/catalogoBeneficiosRaciais.ts";
import { Mordida } from "./caracteristicasRaciais/catalogoCaracteristicasRaciais.ts";
import { MauCheiro } from "./habilidadesRaca/catalogoHabilidadesRaciais.ts";

export class Trog extends Raca {
    constructor() {
        super("Trog");
    }

    getBonusForca(): number {
        return 2;
    }
    getBonusDestreza(): number {
        return 0;
    }
    getBonusConstituicao(): number {
        return 4;
    }
    getBonusInteligencia(): number {
        return -2;
    }
    getBonusSabedoria(): number {
        return 0;
    }
    getBonusCarisma(): number {
        return 0;
    }

    getBeneficiosRaciais(): BeneficioRacial[] {
        return [
            new Reptiliano(),
            new SangueFrio()
        ];
    }

    getCaracteristicasRaciais(): CaracteristicaRacial[] {
        return [
            new Mordida()
        ];
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new MauCheiro(),
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}