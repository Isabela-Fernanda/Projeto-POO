import { Item } from "./item.js";
import { Personagem } from "../personagens/personagem.js";
import { AcaoItem } from "./item.js";

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