import { Mapa } from "../mapa/mapa.ts";
import { Personagem } from "../personagens/personagem.ts";
import { Turno } from "./turno.ts";

export class Rodada {
    constructor(
        private participantes: Personagem[],
        private mapa: Mapa
 ) {}

    executar(): void {
        this.mapa.processarEfeitosArea();

        for (const personagem of this.participantes) {
            if (!personagem.estaVivo()) {
                continue;
            }

            Turno.executar(personagem, this.participantes, this.mapa);

            personagem.atualizarEfeitos();
        }
    }
}