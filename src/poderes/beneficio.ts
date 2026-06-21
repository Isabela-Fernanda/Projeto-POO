import { Personagem } from "../personagens/personagem.ts";

export abstract class Beneficio {
    constructor(
        protected nome: string,
        protected descricao: string,
    ){}

    abstract aplicar(personagem: Personagem): void;
}