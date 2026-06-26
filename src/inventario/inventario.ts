import { Item } from "./itens/item.ts";
import { Personagem } from "../personagens/personagem.ts";
import { ItemInventario } from "./itemInventario.ts";
import { Arma } from "./itens/arma.ts";
import { Armadura } from "./itens/armadura.ts";
import { CatalogoArmas } from "./itens/catalogoArmas.ts";

export class Inventario {
    private itens: ItemInventario[] = [];

    private armaPrincipal?: Arma;
    private armaSecundaria?: Arma;
    private armaduraEquipada?: Armadura;

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

    equiparArmaPrincipal(arma: Arma) {
        this.remover(arma);

        if (this.armaPrincipal) {
            this.adicionar(this.armaPrincipal);
        }

        this.armaPrincipal = arma;
    }

    equiparArmaSecundaria(arma: Arma) {
        this.remover(arma);

        if (this.armaSecundaria) {
            this.adicionar(this.armaSecundaria);
        }

        this.armaSecundaria = arma;
    }

    equiparArmadura(armadura: Armadura) {
        this.remover(armadura);

        if (this.armaduraEquipada) {
            this.adicionar(this.armaduraEquipada);
        }

        this.armaduraEquipada = armadura;
    }

    getItens(): ItemInventario[] {
        return this.itens;
    }

    getItem(indice: number): ItemInventario | undefined {
        return this.itens[indice];
    }

    listarEquipamento(): void {
        console.log("\n=== EQUIPADOS ===");

        if ((this.armaPrincipal === this.armaSecundaria) && (this.armaPrincipal !== CatalogoArmas.DESARMADO) && (this.armaPrincipal !== undefined)) {
            console.log(`Duas mãos: ` + this.armaPrincipal?.getNome());
        } else {
            if (this.armaPrincipal) {
                console.log(`Mão direita: ` + this.armaPrincipal?.getNome());
            }

            if (this.armaSecundaria) {
                console.log(`Mão esquerda: ` + this.armaSecundaria?.getNome());
            }
        }

        if (this.armaduraEquipada) {
            console.log(`Armadura: ` + this.armaduraEquipada?.getNome());
        }
    }

    listarItens(): void {
        console.log("\n=== MOCHILA ===");
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