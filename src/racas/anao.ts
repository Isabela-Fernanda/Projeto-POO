import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { Caracteristica } from "../poderes/caracteristica.ts";
import { Beneficio } from "../poderes/beneficio.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { ConnhecimentoDasRochas, TradicaoDeHeredrimm } from "./poderesRaciais/catalogoBeneficiosRaciais.ts";
import { DevagarESempre, DuroComoPedra } from "./poderesRaciais/catalogoCaracteristicasRaciais.ts";

export class Anao extends Raca {
    constructor() {
        super("Anão");
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

    getBeneficiosRaciais(): Beneficio[] {
        return [
            new ConnhecimentoDasRochas(),
            new TradicaoDeHeredrimm()
        ];
    }

    getCaracteristicasRaciais(): Caracteristica[] {
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