import { Item } from "./itens/item.ts";
import { Personagem } from "../personagens/personagem.ts";

export class Inventario {
    private itens: Item[] = [];

    adicionar(item: Item): void {
        this.itens.push(item);
    }

    removerItem(item: Item): void {
        const index = this.itens.indexOf(item);
        if (index >= 0) {
            this.itens.splice(index, 1);
        }
    }

    getItens(): Item[] {
        return this.itens;
    }

    listarItens(): void {
        console.log("\n=== INVENTÁRIO ===");
        if (this.itens.length === 0) {
            console.log("Vazio.");
            return;
        }
        this.itens.forEach((item, indice) => {
            console.log(`${indice + 1} - ${item.getNome()}`);
        });
    }

    static escolherObjetoInventario(jogador: Personagem): Item {
        while (true) {
            const itens = jogador.getInventario().getItens();

            if (itens.length === 0) {
                throw new Error("O inventário está vazio.");
            }

            console.log("\n=== INVENTÁRIO ===");

            itens.forEach((item, indice) =>
                console.log(`${indice + 1} - ${item.getNome()}`));

            const escolha = Number(prompt("Escolha um item:"));

            const item = itens[escolha - 1];
            if (item) {
                return item;
            }

            console.log("Escolha invalida! Tente novamente.");
        }
    }
}