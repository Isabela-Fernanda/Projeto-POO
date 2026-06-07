import { Raca } from "./raca.ts";
import { Habilidade } from "../habilidades/habilidades.ts";

export class SereiaTritao extends Raca {
    getHabilidadesRaciais(): Habilidade[] {
        return [];
    }

    constructor() {
        super(
            "SereiaTritao", 0, 0, 0, 0, 0, 0
        );
    }
}