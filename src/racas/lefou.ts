import { Raca } from "./raca.ts";
import { Atributos } from "../personagens/atributos/atributos.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Lefou extends Raca {
    aplicarBonus(atributos: Atributos): void {
        atributos.calcularCarisma(-2);
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }
    
    constructor() {
        super(
            "Lefou"
        );
    }  
}