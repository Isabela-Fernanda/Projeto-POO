import { Jogador } from "../personagens/tiposPersonagem/jogador.ts";
import { EscolherPericia } from "./escolher/escolherPericia.ts";
import { EscolherPoderGeral } from "./escolher/escolherPoderesGerais.ts";

export class AplicarBeneficioRacial {
    static aplicarVersatil(jogador: Jogador): void {
        console.log("\n=== BENEFÍCIO RACIAL: VERSÁTIL ===");

        console.log("1 - Duas perícias");
        console.log("2 - Uma perícia e um poder geral");

        const escolha = prompt("Escolha:");

        switch (escolha) {
            case "2":
                const pericia = EscolherPericia.escolherPericiaNaoTreinada(jogador);
                jogador.adicionarPericia(pericia);

                const poder = new EscolherPoderGeral().escolher(1)[0];
                jogador.adicionarHabilidade(poder);

                break;
            default:
                for (let i = 0; i < 2; i++) {
                    const pericia = EscolherPericia.escolherPericiaNaoTreinada(jogador);

                    jogador.adicionarPericia(pericia);
                }

                break;
        }
    }
}