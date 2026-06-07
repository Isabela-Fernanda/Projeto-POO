import { Raca } from "./raca.ts";
import { Atributos } from "../personagens/atributos/atributos.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Goblin extends Raca {
    aplicarBonus(atributos: Atributos): void {
        atributos.calcularDestreza(4);
        atributos.calcularInteligencia(2);
        atributos.calcularCarisma(-2);
    }

    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }
    
    constructor() {
        super(
            "Goblin"
        );
    }

}