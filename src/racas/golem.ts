import { Raca } from "./raca.ts";
import { Atributos } from "../personagens/atributos/atributos.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Golem extends Raca {
    aplicarBonus(atributos: Atributos): void {
        atributos.calcularForca(4);
        atributos.calcularConstituicao(2);
        atributos.calcularCarisma(-2);
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    constructor() {
        super(
            "Golem"
        );
    }
}