import { Personagem } from "../personagens/personagem.ts";
import { Turno } from "./turno.ts";

export class Rodada {
    constructor(
        private participantes: Personagem[]
 ) {}

    executar(): void {
        for (const personagem of this.participantes) {
            if (!personagem.estaVivo()) {
                continue;
            }

            Turno.executar(personagem, this.participantes);

            personagem.atualizarEfeitos();
        }
    }
}