import { Personagem } from "../personagens/personagem";

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
