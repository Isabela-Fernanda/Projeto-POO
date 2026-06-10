import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { ConnhecimentoDasRochas, DevagarESempre, DuroComoPedra, TradicaoDeHeredrimm } from "../habilidades/habilidadesRaca/habilidadesAnao.ts";
import { TipoAtributo } from "../personagens/atributos/atributos.ts";

export class Anao extends Raca {
    constructor() {
        super(
            "Anao", 
        );
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

    getHabilidadesRaciais(): Habilidade[] {
        return [
            new ConnhecimentoDasRochas(),
            new DevagarESempre(),
            new DuroComoPedra(),
            new TradicaoDeHeredrimm()
        ];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }

    getAtributosProibidos(): TipoAtributo[] {
        return [];
    }
}