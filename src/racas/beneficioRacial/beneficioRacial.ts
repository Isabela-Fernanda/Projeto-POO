import { Personagem } from "../../personagens/personagem.ts";

export abstract class BeneficioRacial {
    constructor(
        protected nome: string,
        protected descricao: string,
    ){}

    abstract aplicar(personagem: Personagem): void;
}