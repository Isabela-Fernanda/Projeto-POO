import { Item } from "../itens/item.ts";

export class Inventario {
    private itens: Item[] = [];

    adicionarItem(item: Item): void{
        this.itens.push(item);
    }

    removerItem(item: Item): void{
        const index = this.itens.indexOf(item);
        if(index >= 0){
            this.itens.splice(index, 1);
        }
    }

    listarItens(): void {
        this.itens.forEach(item => {
            console.log(item.getNome());
        });
    }
}