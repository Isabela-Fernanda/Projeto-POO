import { GrupoArma } from "./arma.ts";
import { Item, Modificacoes, AcaoItem } from "./item.ts";
import { Personagem } from "../personagens/personagem.ts";

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