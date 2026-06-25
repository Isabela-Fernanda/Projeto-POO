import { Raca } from "../raca.ts";

import { TipoAtributo } from "../../personagens/atributos/atributos.ts";

import { Caracteristica } from "../../poderes/caracteristica.ts";
import { Beneficio } from "../../poderes/beneficio.ts";
import { Habilidade } from "../../poderes/habilidades.ts";
import { SorteSalvadora, Arremessador } from "../poderesRaciais/catalogoBeneficiosRaciais.ts";
import { PequenoERechonchudo } from "../poderesRaciais/catalogoCaracteristicasRaciais.ts";

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

    getBeneficiosRaciais(): Beneficio[] {
        return [
            new SorteSalvadora(),
            new Arremessador()
        ];
    }

    getCaracteristicasRaciais(): Caracteristica[] {
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