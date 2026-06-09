import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Trog extends Raca {
    constructor() {
        super(
            "Trog"
        );
    }

    getBonusForca(): number {
        return 2;
    }
    getBonusDestreza(): number {
        return 0;
    }
    getBonusConstituicao(): number {
        return 4;
    }
    getBonusInteligencia(): number {
        return -2;
    }
    getBonusSabedoria(): number {
        return 0;
    }
    getBonusCarisma(): number {
        return 0;
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    precisaEscolherBonus(): boolean {
        return false;
    }
}