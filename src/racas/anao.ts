import { Raca } from "./raca.ts";
import { Atributos } from "../personagens/atributos/atributos.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Anao extends Raca {
    aplicarBonus(atributos: Atributos): void {
        atributos.calcularDestreza(-2);
        atributos.calcularConstituicao(4);
        atributos.calcularSabedoria(2);
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    constructor() {
        super(
            "Anao"
        );
    }



}