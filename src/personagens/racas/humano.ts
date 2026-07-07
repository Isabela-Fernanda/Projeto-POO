import { Raca } from "./raca.js";

import { TipoAtributo } from "../atributos/atributos.js";

import { Caracteristica } from "../../poderes/caracteristica.js";
import { Beneficio } from "../../poderes/beneficio.js";
import { Habilidade } from "../../poderes/habilidades.js";
import { Versatil } from "./poderesRaciais.js";

export class Humano extends Raca {
    constructor() {
        super("Humano");
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
        return `Humanos são adaptáveis e versáteis.\n\nBenefícios:\n• Versátil\nEscolha duas perícias ou uma perícia e um poder geral.\n\nCaracterísticas:\nNenhuma.`;
    }

    getBeneficiosRaciais(): Beneficio[] {
        return [
            new Versatil()
        ];
    }

    getCaracteristicasRaciais(): Caracteristica[] {
        return [];
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    precisaEscolherBonus(): boolean {
        return true;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}