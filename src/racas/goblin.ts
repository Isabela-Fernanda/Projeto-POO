import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { CaracteristicaRacial } from "./caracteristicasRaciais/caracteristicaRacial.ts";
import { BeneficioRacial } from "./beneficioRacial/beneficioRacial.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { Engenhoso } from "./beneficioRacial/catalogoBeneficiosRaciais.ts";
import { Espelunqueiro, PesteEsguia, RatoDasRuas } from "./caracteristicasRaciais/catalogoCaracteristicasRaciais.ts";

export class Goblin extends Raca {
    constructor() {
        super("Goblin");
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
        return 2;
    }
    getBonusCarisma(): number {
        return -2;
    }

    getBeneficiosRaciais(): BeneficioRacial[] {
        return [
            new Engenhoso()
        ];
    }

    getCaracteristicasRaciais(): CaracteristicaRacial[] {
        return [
            new Espelunqueiro(),
            new PesteEsguia(),
            new RatoDasRuas()
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