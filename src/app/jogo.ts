import { Tela } from "../ui/tela.ts";
import { CriacaoPersonagem } from "../criacao/criarPersonagem.ts";

export class Jogo {

    async iniciar() {

        console.clear();
        console.log("=== RPG TORMENTA ===");

        const nome =
            prompt("Digite o nome do herói:");

        console.log(
            `Bem-vindo, ${nome}!`
        );

        const jogador = CriacaoPersonagem.criar();

        const inimigo = CriacaoPersonagem.criar();

        while (jogador.estaVivo() && inimigo.estaVivo()) {
            console.clear();
            console.log("=== COMBATE ===");
            Tela.mostrarStatus(jogador);
            Tela.mostrarStatus(inimigo);

            const opcao = prompt(
                `1 - Atacar \n2 - Ver Status\n\nEscolha: `
            );
            switch (opcao) {
                case "1":
                    jogador.atacar(inimigo);
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
            if (inimigo.estaVivo()) {
                inimigo.atacar(jogador);
            }
            if (!jogador.estaVivo()) {
                console.log("Você foi derrotado!");
                break;
            }
            console.log();
            Tela.mostrarStatus(jogador);
            Tela.mostrarStatus(inimigo);

            if (!inimigo.estaVivo()) {
                console.log("Você venceu!");
                break;
            }
            
            prompt(
                "Pressione Enter para continuar..."
            );

        }
    }
}