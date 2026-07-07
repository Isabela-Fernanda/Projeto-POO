import { Personagem } from "../personagens/personagem.js";
import { ItemInventario } from "./itemInventario.js";

export class MenuItem {
    static abrir(personagem: Personagem, item: ItemInventario) {
        while (true) {
            console.log(`=== ${item.item.getNome().toLocaleUpperCase()} ===`);

            const acoes = item.item.getAcoes(personagem);

            acoes.forEach((acao, i) => {
                console.log(`${i + 1} - ${acao.nome}`);
            });

            console.log("0 - Voltar");

            const escolha = Number(prompt("Escolha:"));

            if (escolha == 0) return false;

            const acao = acoes[escolha - 1];

            if (!acao) continue;

            if (acao.executar(personagem)) return true;
        }
    }
}