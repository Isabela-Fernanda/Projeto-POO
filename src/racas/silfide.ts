import { Raca } from "./raca.ts";

import { TipoAtributo } from "../personagens/atributos/atributos.ts";

import { Caracteristica } from "../poderes/caracteristica.ts";
import { Beneficio } from "../poderes/beneficio.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { MagiaDasFadas } from "./poderesRaciais/catalogoBeneficiosRaciais.ts";
import { AsasDeBorboleta, EspiritoDaNatureza } from "./poderesRaciais/catalogoCaracteristicasRaciais.ts";
import { Voo } from "./poderesRaciais/catalogoHabilidadesRaciais.ts";

export class Silfide extends Raca {
    constructor() {
        super("Sílfide");
    }

    getBonusForca(): number {
        return -4;
    }
    getBonusDestreza(): number {
        return 2;
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
        return 4;
    }

    getBeneficiosRaciais(): Beneficio[] {
        return [
            new MagiaDasFadas()
        ];
    }

    getCaracteristicasRaciais(): Caracteristica[] {
        return [
            new AsasDeBorboleta(),
            new EspiritoDaNatureza()
        ];
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new Voo()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}

