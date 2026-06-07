import { Raca } from "./raca.ts";
import { Atributos } from "../personagens/atributos/atributos.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Trog extends Raca {
    aplicarBonus(atributos: Atributos): void {
        atributos.calcularForca(2);
        atributos.calcularConstituicao(4);
        atributos.calcularInteligencia(-2);
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    constructor() {
        super(
            "Trog"
        );
    }
}