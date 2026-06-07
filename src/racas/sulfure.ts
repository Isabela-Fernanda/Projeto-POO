import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class Sulfure extends Raca {
    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    constructor(){
        super(
            "Sulfure", 0, 4, 0, 2, 0, 0
        );
    }
}