import { Raca } from "./raca.ts";
import { Atributos } from "../personagens/atributos/atributos.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Osteon extends Raca {
    aplicarBonus(atributos: Atributos): void {
        atributos.calcularConstituicao(-2);
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }
    
    constructor() {
        super(
            "Osteon"
        );
    }
}