import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { CaracteristicaRacial } from "./caracteristicasRaciais/caracteristicaRacial.ts";
import { BeneficioRacial } from "./beneficioRacial/beneficioRacial.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { ConnhecimentoDasRochas, TradicaoDeHeredrimm } from "./beneficioRacial/catalogoBeneficiosRaciais.ts";
import { DevagarESempre, DuroComoPedra } from "./caracteristicasRaciais/catalogoCaracteristicasRaciais.ts";

export class Anao extends Raca {
    constructor() {
        super("Anao");
    }

    getBonusForca(): number {
        return 0;
    }
    getBonusDestreza(): number {
        return -2;
    }
    getBonusConstituicao(): number {
        return 4;
    }
    getBonusInteligencia(): number {
        return 0;
    }
    getBonusSabedoria(): number {
        return 2;
    }
    getBonusCarisma(): number {
        return 0;
    }

    getBeneficiosRaciais(): BeneficioRacial[] {
        return [
            new ConnhecimentoDasRochas(),
            new TradicaoDeHeredrimm()
        ];
    }

    getCaracteristicasRaciais(): CaracteristicaRacial[] {
        return [
            new DevagarESempre(),
            new DuroComoPedra()
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