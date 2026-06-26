import { Personagem } from "../personagens/personagem.ts";
import { MenuItem } from "./menuItem.ts";
import { ItemInventario } from "./itemInventario.ts";

export class MenuInventario {
    static abrir(personagem: Personagem): boolean {
        while (true) {
            console.log("=== INVENTÁRIO ===");

            const inventario = personagem.getInventario();

            inventario.listarItens();

            console.log("0 - Voltar");

            const escolha = Number(prompt("Escolha:"));

            if (escolha == 0) return false;

            const entrada = inventario.getItem(escolha - 1);

            if (!entrada) continue;

            if (MenuItem.abrir(personagem, entrada)) return true;
        }
    }

    static escolherObjetoInventario(jogador: Personagem): ItemInventario {
        while (true) {
            const itens = jogador.getInventario().getItens();

            if (itens.length === 0) {
                throw new Error("O inventário está vazio.");
            }

            console.log("\n=== INVENTÁRIO ===");

            itens.forEach((i, indice) => console.log(`${indice + 1} - ${i.getNomeExibicao()}`));

            const escolha = Number(prompt("Escolha um item:"));

            const item = itens[escolha - 1];
            if (item) {
                return item;
            }

            console.log("Escolha invalida! Tente novamente.");
        }
    }
}