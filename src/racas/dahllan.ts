import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { AmigaDasPlantas, ArmaduraDeAllihanna, EmpatiaSelvagem } from "../habilidades/habilidadesRaca/habilidadesDahllan.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Dahllan extends Raca {
    constructor() {
        super(
            "Dahllan"
        );
    }

    getBonusForca(): number {
        return 0;
    }
    getBonusDestreza(): number {
        return 2;
    }
    getBonusConstituicao(): number {
        return 0;
    }
    getBonusInteligencia(): number {
        return -2;
    }
    getBonusSabedoria(): number {
        return 4;
    }
    getBonusCarisma(): number {
        return 0;
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new AmigaDasPlantas(),
            new ArmaduraDeAllihanna(),
            new EmpatiaSelvagem()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}