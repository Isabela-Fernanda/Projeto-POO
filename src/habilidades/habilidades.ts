import { Personagem } from "../personagens/personagem.ts";

export abstract class Habilidade {
    constructor(
        protected nome: string,
        protected custoMana: number,
    ){}

    abstract usar(
        usuario: Personagem,
        alvo: Personagem
    ): void;
}
