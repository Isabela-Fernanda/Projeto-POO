import { Mapa } from "../mapa/mapa.ts";
import { SalaInicial } from "../mapa/salas/salaInicial.ts";

import { Tela } from "../ui/tela.ts";
import { Jogador } from "../personagens/jogador.ts";

import { Item } from "../inventario/itens/item.ts";
import { Arma } from "../inventario/itens/arma.ts";
import { Armadura } from "../inventario/itens/armadura.ts";

import { CriacaoPersonagem } from "../criacao/criarPersonagem.ts";
import { Combate } from "../combate/combate.ts";
import { Time } from "../personagens/time.ts";
import { GerenciadorTutorial } from "../mapa/salas/gerenciadorTutorial.ts";
import { ResultadoInteracao } from "../mapa/catalogoObjetos.ts";

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

                    if (objetosAdjacentes.length === 0) {
                        console.log("Não há objetos por perto.");
                    } else if (objetosAdjacentes.length === 1) {
                        const resultado = objetosAdjacentes[0].interagir(jogador);
                        switch (resultado) {
                            case ResultadoInteracao.ENTRAR_MASMORRA:
                                this.tutorial.processarInteracao(resultado);
                                break;
                        }
                        prompt("\nPressione Enter para continuar...");
                    } else {
                        objetosAdjacentes.forEach((objeto, indice) =>
                            console.log(`${indice + 1} - ${objeto.getNome()}`));

                        const escolha = Number(prompt("Escolha um objeto:"));

                        const objeto = objetosAdjacentes[escolha - 1];
                        if (objeto) {
                            const resultado = objeto.interagir(jogador);
                            switch (resultado) {
                                case ResultadoInteracao.ENTRAR_MASMORRA:
                                    this.tutorial.processarInteracao(resultado);
                                    break;
                            }
                            prompt("\nPressione Enter para continuar...");
                        }
                    }
                    break;
                case "I":
                    console.clear();
                    console.log("=== INVENTÁRIO ===");
                    for (const item of jogador.getInventario().getItens()) {
                        console.log(item.getNome());
                    }
                    prompt("\nPressione Enter para voltar ao mapa...");
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
        }
    }
}