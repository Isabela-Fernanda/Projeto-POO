import { GrupoArma } from "./arma.js";
import { Item, Modificacoes, AcaoItem } from "./item.js";
import { Personagem } from "../personagens/personagem.js";

export class Municao extends Item {
    constructor(
        nome: string,
        preco: number,
        peso: number,
        descricao: string = "",
        paraArma: GrupoArma,
        modificacoes: Modificacoes[] = [],
    ) {
        super(nome, preco, peso, descricao, modificacoes);
    }

    getAcoes(personagem: Personagem): AcaoItem[] {
        return [];
    }
}