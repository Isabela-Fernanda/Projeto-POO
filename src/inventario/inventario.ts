import { Item } from "./itens/item.ts";

export class Inventario {
    private itens: Item[] = [];

    adicionar(item: Item): void{
        this.itens.push(item);
    }

    removerItem(item: Item): void{
        const index = this.itens.indexOf(item);
        if(index >= 0){
            this.itens.splice(index, 1);
        }
    }

    getItens(): Item[] {
        return this.itens;
    }

    listarItens(): void {
        console.log("\n=== INVENTÁRIO ===");
        if(this.itens.length === 0){
            console.log("Vazio.");
            return;
        }
        this.itens.forEach((item, indice) => {
            console.log(`${indice + 1} - ${item.getNome()}`);
        });
    }
}