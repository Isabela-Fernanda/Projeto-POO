import { Raca } from "./raca.ts";
import { Atributos } from "../personagens/atributos/atributos.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Kliren extends Raca {
    aplicarBonus(atributos: Atributos): void {
        atributos.calcularForca(-2);
        atributos.calcularInteligencia(4);
        atributos.calcularCarisma(2);
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    constructor() {
        super(
            "Kliren"
        );
    }
}