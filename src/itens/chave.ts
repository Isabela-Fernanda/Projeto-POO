import { Item } from "./item.ts";
import { Personagem } from "../personagens/personagem.ts";
import { AcaoItem } from "./item.ts";

export class Chave extends Item {
    constructor(
        private id: string,
        nome: string,
        descricao: string
    ) { 
        super(nome, 0, 1, descricao)
    }

    getId(): string {
        return this.id;
    }

    getAcoes(personagem: Personagem): AcaoItem[] { 
        return [];
    }
}