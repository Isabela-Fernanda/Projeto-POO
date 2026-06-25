import { Raca } from "./raca.ts";

import { TipoAtributo } from "../atributos/atributos.ts";

import { Caracteristica } from "../../poderes/caracteristica.ts";
import { Beneficio } from "../../poderes/beneficio.ts";
import { Habilidade } from "../../poderes/habilidades.ts";

import { ConhecimentoDasRochas, TradicaoDeHeredrimm, DevagarESempre, DuroComoPedra } from "./poderesRaciais.ts";

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

    getResumo(): string {
        return `Os anões são resistentes e acostumados à vida subterrânea.\n\nBenefícios:\n• Conhecimento das Rochas\n  Visão no escuro e +2 em Percepção e Sobrevivência no subterrâneo.\n\n• Tradição de Heredrimm\n  +2 em ataques com armas tradicionais anãs.\n\nCaracterísticas:\n• Devagar\nSeu deslocamento é reduzido.`;
    }

    getBeneficiosRaciais(): Beneficio[] {
        return [
            new ConhecimentoDasRochas(),
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