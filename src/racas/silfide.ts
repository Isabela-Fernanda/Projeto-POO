import { Raca } from "./raca.ts";
import { Atributos } from "../personagens/atributos/atributos.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Silfide extends Raca {
    aplicarBonus(atributos: Atributos): void {
        atributos.calcularForca(-4);
        atributos.calcularDestreza(2);
        atributos.calcularCarisma(4);
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }
    
    constructor() {
        super(
            "Silfide"
        );
    }
}