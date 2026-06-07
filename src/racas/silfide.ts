import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Silfide extends Raca {
    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    constructor() {
        super(
            "Silfide"
        );
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
}