import { Raca } from "./raca.js";

import { TipoAtributo } from "../../personagens/atributos/atributos.js";

import { Caracteristica } from "../../poderes/caracteristica.js";
import { Beneficio } from "../../poderes/beneficio.js";
import { Habilidade } from "../../poderes/habilidades.js";

export class Monstruosa extends Raca {
    constructor() {
        super("Monstro");
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
        return 0;
    }

    getResumo(): string {
        return "";
    }

    getBeneficiosRaciais(): Beneficio[] {
        return [];
    }

    getCaracteristicasRaciais(): Caracteristica[] {
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