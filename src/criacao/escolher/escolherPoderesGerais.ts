import { Habilidade } from "../../poderes/habilidades.js";
import { CatalogoPoderesGerais } from "../../poderes/poderesGerais/catalogoPoderesGerais.js";

export class EscolherPoderGeral {
    escolher(quantidade: number = 1): Habilidade[] {
        const disponiveis = CatalogoPoderesGerais.PODERES;
        const escolhidos: Habilidade[] = [];

        console.log(`Escolha ${quantidade} poder(es) geral(is).`);

        while (escolhidos.length < quantidade) {
            console.log("\n=== PODERES GERAIS ===");

            disponiveis.forEach((poder, indice) => {
                console.log(`${indice + 1} - ${poder.nome}`);
            });

            const escolha = Number(prompt("Escolha:")) - 1;
            const poder = disponiveis[escolha];

            if (!poder) {
                console.log("Escolha inválida.");
                continue;
            }

            if (escolhidos.some(p => p.getNome() === poder.nome)) {
                console.log("Poder já escolhido.");
                continue;
            }

            escolhidos.push(poder.criar());
            console.log(`${poder.nome} adicionado.`);
        }

        return escolhidos;
    }
}