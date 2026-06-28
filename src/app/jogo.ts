import { Mapa } from "../mapa/mapa.ts";
import { Jogador } from "../personagens/jogador.ts";

import { CriacaoPersonagem } from "../criacao/criarPersonagem.ts";
import { Combate } from "../combate/combate.ts";
import { GerenciadorTutorial } from "../mapa/salas/gerenciadorTutorial.ts";
import { Espolio, ResultadoInteracao } from "../mapa/catalogoObjetos.ts";

import { SistemaEncontros } from "../combate/sistemaEncontros.ts";
import { MenuInventario } from "../inventario/menuInventario.ts";
import { Objeto } from "../mapa/objeto.ts";

export class Jogo {
    private tutorial!: GerenciadorTutorial;

    async iniciar() {
        console.clear();
        console.log("=== RPG TORMENTA ===");

        console.log("\nCriando Personagem 1");
        const jogador = CriacaoPersonagem.criar();

        const mapa = new Mapa();

        this.tutorial = new GerenciadorTutorial(mapa, jogador);
        this.tutorial.iniciar();

        this.loopDeExploracao(mapa, jogador);
    }

    private loopDeExploracao(mapa: Mapa, jogador: Jogador,): void {
        let jogando = true;
        while (jogando) {
            console.clear();

            mapa.renderizar();

            console.log("\n=== AÇÕES ===");
            console.log("W/A/S/D - Mover");
            console.log("E - Interagir com Objeto");
            console.log("I - Ver Inventário");
            console.log("Q - Sair");

            const acao = prompt("\nEscolha uma ação:")?.toUpperCase();

            const xAtual = jogador.getX();
            const yAtual = jogador.getY();

            switch (acao) {
                case "W":
                    mapa.moverEntidade(jogador, xAtual, yAtual - 1);
                    break;
                case "S":
                    mapa.moverEntidade(jogador, xAtual, yAtual + 1);
                    break;
                case "A":
                    mapa.moverEntidade(jogador, xAtual - 1, yAtual);
                    break;
                case "D":
                    mapa.moverEntidade(jogador, xAtual + 1, yAtual);
                    break;
                case "E":
                    const objetosAdjacentes = mapa.getObjetos().filter(obj => {
                        const distancia = mapa.calcularDistancia(jogador.getX(), jogador.getY(), obj.getX(), obj.getY());

                        return distancia <= 1.5;
                    });

                    let objeto: Objeto | undefined;

                    if (objetosAdjacentes.length === 0) {
                        console.log("Não há objetos por perto.");
                        prompt("\nPressione Enter para continuar...");
                        break;
                    }

                    if (objetosAdjacentes.length === 1) {
                        objeto = objetosAdjacentes[0];
                    } else {
                        objetosAdjacentes.forEach((obj, i) =>
                            console.log(`${i + 1} - ${obj.getNome()}`)
                        );

                        const escolha = Number(prompt("Escolha um objeto:"));
                        objeto = objetosAdjacentes[escolha - 1];
                    }

                    if (objeto) {
                        const resultado = objeto.interagir(jogador);

                        switch (resultado) {
                            case ResultadoInteracao.ENTRAR_MASMORRA:
                                this.tutorial.processarInteracao(resultado);
                                break;
                        }

                        if (objeto instanceof Espolio && !objeto.possuiItens()) {
                            mapa.removerObjeto(objeto);
                        }
                        prompt("\nPressione Enter para continuar...");
                    }
                    break;
                case "I":
                    MenuInventario.abrir(jogador);
                    break;
                case "Q":
                    jogando = false;
                    console.log("Saindo do jogo...");
                    break;
                default:
                    console.log("Ação inválida!");
                    prompt("\nPressione Enter para continuar...");
                    break;
            }

            const inimigos = SistemaEncontros.verificarEncontro(jogador, mapa);
            if (inimigos) {
                const participantes = [jogador, ...inimigos];
                const combate = new Combate(mapa, participantes);
                combate.iniciar();
                if (!jogador.estaVivo()) {
                    console.log("Game Over");
                    return;
                }

            }
        }
    }
}