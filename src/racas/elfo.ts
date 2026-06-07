import { Raca } from "./raca.ts";
import { Atributos } from "../personagens/atributos/atributos.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Elfo extends Raca {
    aplicarBonus(atributos: Atributos): void {
        atributos.calcularDestreza(2);
        atributos.calcularConstituicao(-2);
        atributos.calcularInteligencia(4);
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }
    
    constructor() {
        super(
            "Elfo"
        );
    }
}