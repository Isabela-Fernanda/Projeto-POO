import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { CaracteristicaRacial } from "./caracteristicasRaciais/caracteristicaRacial.ts";
import { BeneficioRacial } from "./beneficioRacial/beneficioRacial.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { SorteSalvadora, Arremessador } from "./beneficioRacial/catalogoBeneficiosRaciais.ts";
import { PequenoERechonchudo } from "./caracteristicasRaciais/catalogoCaracteristicasRaciais.ts";

export class Hynne extends Raca {
    constructor() {
        super("Hynne");
    }

    getBonusForca(): number {
        return -2;
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
        return [
            new SorteSalvadora(),
            new Arremessador()
        ];
    }

    getCaracteristicasRaciais(): CaracteristicaRacial[] {
        return [
            new PequenoERechonchudo()
        ];
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