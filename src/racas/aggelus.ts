import { Raca } from "./raca.ts";
import { Atributos } from "../personagens/atributos/atributos.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Aggelus extends Raca {
    aplicarBonus(atributos: Atributos): void {
        atributos.calcularSabedoria(4);
        atributos.calcularCarisma(2);
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    constructor() {
        super(
            "Aggelus"
        );
    }
}