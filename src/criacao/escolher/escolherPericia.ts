import { Classe } from "../../personagens/classes/classe.ts";
import { Pericia, GrauTreinamento } from "../../pericias/pericia.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";
import { Jogador } from "../../personagens/jogador.ts";

export class EscolherPericia {
    escolher(classe: Classe): Map<Pericia, GrauTreinamento> {
        const pericias = new Map<Pericia, GrauTreinamento>();
        const disponiveis = classe.getPericiasDisponiveis();
        const quantidade = classe.getPericiasTreinadas();

        for (let i = 0; i < quantidade; i++) {
            console.log(`\nEscolha a perícia ${i + 1}:`);

            disponiveis.forEach((pericia, indice) => {
                console.log(`${indice + 1} - ${pericia.getNome()}`);
            });

            const escolha = Number(prompt("Escolha:"));
            const pericia = disponiveis[escolha - 1];

            if (!pericia) {
                console.log("Perícia inválida.");
                i--;
                continue;
            }

            if (pericias.has(pericia)) {
                console.log("Você já escolheu essa perícia.");
                i--;
                continue;
            }

            pericias.set(pericia, GrauTreinamento.TREINADO);
        }

        console.log("\n=== PERÍCIAS ESCOLHIDAS ===");

        pericias.forEach((_, pericia) => {
            console.log(pericia.getNome());
        });

        return pericias;
    }

    static escolherUma(disponiveis: Pericia[]): Pericia {
        console.log("\n=== ESCOLHA UMA PERÍCIA ===");

        disponiveis.forEach((pericia, indice) => {
            console.log(`${indice + 1} - ${pericia.getNome()}`);
        });

        const escolha = Number(prompt("Escolha:"));
        const pericia = disponiveis[escolha - 1];

        if (!pericia) {
            throw new Error("Perícia inválida.");
        }

        return pericia;
    }

    static escolherPericiaNaoTreinada(jogador: Jogador): Pericia {
        while (true) {
            const pericia = EscolherPericia.escolherUma(CatalogoPericias.getTodas());

            if (jogador.possuiPericia(pericia)) {
                console.log("Você já possui essa perícia.");
                continue;
            }

            return pericia;
        }
    }
}