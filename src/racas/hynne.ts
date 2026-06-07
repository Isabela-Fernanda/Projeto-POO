import { Raca } from "./raca.ts";
import { Atributos } from "../personagens/atributos/atributos.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Hynne extends Raca {
    aplicarBonus(atributos: Atributos): void {
        atributos.calcularForca(-2);
        atributos.calcularDestreza(4);
        atributos.calcularCarisma(2);
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }
    
    constructor() {
        super(
            "Hynne"
        );
    }
}