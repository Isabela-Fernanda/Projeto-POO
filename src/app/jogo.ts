import { Tela } from "../ui/tela.ts";
import { Guerreiro } from "../personagens/classes/guerreiro.ts";
import { Humano } from "../racas/humano.ts";
import { Inventario } from "../inventario/inventario.ts";
import { Equipamento } from "../inventario/equipamento.ts";
import { Atributos } from "../personagens/atributos/atributos.ts";

export class Jogo {

    async iniciar() {

        console.clear();
        console.log("=== RPG TORMENTA ===");

        const nome =
            prompt("Digite o nome do herói:");

        console.log(
            `Bem-vindo, ${nome}!`
        );

        const jogador = new Guerreiro(
            nome ?? "Herói",
            1,
            new Humano(),
            new Atributos(
                5,
                2,
                4,
                1,
                1,
                1
            ),
            2, // defesa
            30,
            10,
            new Inventario(),
            new Equipamento(),
            new Map(),

            []
        );

        const goblin = new Guerreiro(
            "Goblin",
            1,
            new Humano(),
            new Atributos(
                3,
                2,
                2,
                1,
                1,
                1
            ),
            1,
            15,
            0,
            new Inventario(),
            new Equipamento(),
            new Map(),
            []
        );

        while (jogador.estaVivo() && goblin.estaVivo()) {
            console.clear();
            console.log("=== COMBATE ===");
            Tela.mostrarStatus(jogador);
            Tela.mostrarStatus(goblin);

            const opcao = prompt(
                `1 - Atacar \n2 - Ver Status\n\nEscolha: `
            );
            switch (opcao) {
                case "1":
                    jogador.atacar(goblin);
                    break;
                case "2":
                    Tela.titulo("Status do Herói");
                    Tela.mostrarStatus(jogador);
                    prompt("Pressione Enter para continuar...");
                    continue;
                default:
                    console.log("Opção inválida!");
                    prompt("Pressione Enter para continuar...");
            }
            if (goblin.estaVivo()) {
                goblin.atacar(jogador);
            }
            if (!jogador.estaVivo()) {
                break;
            }
            console.log();
            Tela.mostrarStatus(jogador);
            Tela.mostrarStatus(goblin);
            prompt(
                "Pressione Enter para continuar..."
            );

        }

        if (jogador.estaVivo()) {
            console.log("Você venceu!");
        }
        else {
            console.log("Você foi derrotado!");
        }

    }
}