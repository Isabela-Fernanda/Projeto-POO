import { Personagem } from "../personagens/personagem.ts";

export class Combate {
    atacar(
        atacante: Personagem,
        alvo: Personagem,
    ): void {
        atacante.atacar(alvo);
    }
}