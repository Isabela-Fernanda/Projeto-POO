import { Personagem } from "../personagens/personagem.js";

export abstract class Caracteristica {
    constructor(
        protected nome: string,
        protected descricao:string,
    ){}
    
    abstract aplicar(personagem: Personagem): void;

    getNome(): string {
        return this.nome;
    }

    getDescricao(): string {
        return this.descricao;
    }
}