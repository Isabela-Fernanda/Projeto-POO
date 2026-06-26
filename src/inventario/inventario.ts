import { Item } from "./itens/item.ts";
import { Personagem } from "../personagens/personagem.ts";
import { ItemInventario } from "./itemInventario.ts";

export class Inventario {
    private itens: ItemInventario[] = [];

    estaVazio(): boolean {
        return this.itens.length === 0;
    }

    adicionar(item: Item): void {
        if (item.podeEmpilhar()) {
            const pilha = this.encontrarPilha(item);

            if (pilha) {
                pilha.quantidade++;
                return;
            }
        }
        this.itens.push(new ItemInventario(item));
    }

    remover(item: Item): void {
        const pilha = this.encontrarPilha(item);

        if (!pilha) return;

        pilha.quantidade--;

        if (pilha.quantidade <= 0) {
            this.itens = this.itens.filter(i => i !== pilha);
        }
    }

    getItens(): ItemInventario[] {
        return this.itens;
    }

    getItem(indice: number): ItemInventario | undefined {
        return this.itens[indice];
    }

    listarItens(): void {
        console.log("\n=== INVENTÁRIO ===");
        if (this.estaVazio()) {
            console.log("Vazio.");
            return;
        }

        this.itens.forEach((i, indice) => {
            i.exibir(indice + 1);
        });
    }

    private encontrarPilha(item: Item): ItemInventario | undefined {
        return this.itens.find(i =>
            i.item.constructor === item.constructor && i.item.getNome() === item.getNome()
        );
    }
}