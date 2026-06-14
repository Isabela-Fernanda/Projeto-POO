import { Personagem } from "../../personagens/personagem.ts";

export abstract class CaracteristicaRacial {
    constructor(
        protected nome: string,
        protected descricao:string,
    ){}

    getNome(): string {
        return this.nome;
    }

    getDescricao(): string {
        return this.descricao;
    }

    abstract aplicar(personagem: Personagem): void;
}