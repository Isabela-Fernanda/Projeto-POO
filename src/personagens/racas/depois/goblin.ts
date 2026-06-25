import { Raca } from "../raca.ts";

import { TipoAtributo } from "../../personagens/atributos/atributos.ts";

import { Caracteristica } from "../../poderes/caracteristica.ts";
import { Beneficio } from "../../poderes/beneficio.ts";
import { Habilidade } from "../../poderes/habilidades.ts";
import { Engenhoso } from "../poderesRaciais/catalogoBeneficiosRaciais.ts";
import { Espelunqueiro, PesteEsguia, RatoDasRuas } from "../poderesRaciais/catalogoCaracteristicasRaciais.ts";

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

    getBeneficiosRaciais(): Beneficio[] {
        return [
            new Engenhoso()
        ];
    }

    getCaracteristicasRaciais(): Caracteristica[] {
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