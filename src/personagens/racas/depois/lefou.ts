import { Raca } from "../raca.ts";

import { TipoAtributo } from "../../personagens/atributos/atributos.ts";

import { Caracteristica } from "../../poderes/caracteristica.ts";
import { Beneficio } from "../../poderes/beneficio.ts";
import { Habilidade } from "../../poderes/habilidades.ts";
import { CriaDaTormenta, Deformidade } from "../poderesRaciais/catalogoBeneficiosRaciais.ts";

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

    getBeneficiosRaciais(): Beneficio[] {
        return [
            new CriaDaTormenta(),
            new Deformidade()
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
        return [TipoAtributo.CARISMA];
    }
}