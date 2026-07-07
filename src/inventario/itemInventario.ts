import { Item } from "../itens/item.js";

export class ItemInventario {
    constructor(
        public item: Item,
        public quantidade = 1
    ) { }

    getNomeExibicao() {
        if (this.quantidade == 1) return this.item.getNome();

        return `${this.item.getNome()} x${this.quantidade}`;
    }

    exibir(indice: number): void {
        console.log(`${indice} - ${this.getNomeExibicao()}`);
    }
}