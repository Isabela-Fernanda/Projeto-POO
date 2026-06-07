import { Raca } from "./raca.ts";
import { Atributos } from "../personagens/atributos/atributos.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Qareen extends Raca {
    aplicarBonus(atributos: Atributos): void {
        atributos.calcularInteligencia(2);
        atributos.calcularSabedoria(-2);
        atributos.calcularCarisma(4);
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }
    
    constructor() {
        super(
            "Qareen"
        );
    }
}