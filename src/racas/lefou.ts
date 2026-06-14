import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { CaracteristicaRacial } from "./caracteristicasRaciais/caracteristicaRacial.ts";
import { BeneficioRacial } from "./beneficioRacial/beneficioRacial.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { CriaDaTormenta, Deformidade } from "./beneficioRacial/catalogoBeneficiosRaciais.ts";

export class Lefou extends Raca {
    constructor() {
        super("Lefou");
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
        return 0;
    }
    getBonusCarisma(): number {
        return -2;
    }

    getBeneficiosRaciais(): BeneficioRacial[] {
        return [
            new CriaDaTormenta(),
            new Deformidade()
        ];
    }

    getCaracteristicasRaciais(): CaracteristicaRacial[] {
        return [];
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    precisaEscolherBonus(): boolean {
        return true;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [TipoAtributo.CARISMA];
    }
}