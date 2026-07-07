import { Combate } from "@combate/combate.js";
import { GerenciadorTutorial } from "@mapa/salas/gerenciadorTutorial.js";
import { Espolio, ResultadoInteracao } from "@mapa/catalogoObjetos.js";

import { ResultadoJogo } from "@save/menuInicial.js";

import { SistemaEncontros } from "@combate/sistemaEncontros.js";
import { MenuInventario } from "@inventario/menuInventario.js";
import { Objeto } from "@mapa/objeto.js";
import { Campanha } from "@save/campanha.js";
import { Save } from "@save/save.js";
import { SaveManager } from "@save/saveManager.js";
import { Jogador } from "@personagens/tiposPersonagem/jogador.js";

export class Jogo {
    private tutorial!: GerenciadorTutorial;

    constructor(
        private readonly campanha: Campanha,
        private readonly save: Save
    ) { }

    private async salvar() {
        await SaveManager.salvar(this.save);
    }

    async iniciar(): Promise<ResultadoJogo> {
        console.clear();

        this.tutorial = new GerenciadorTutorial(this.campanha.mapa, this.campanha.jogador);
        if (!this.campanha.foiIniciada()) {
            this.tutorial.iniciar();
            this.campanha.marcarIniciada();
        }

        this.campanha.jogador.setSalaAtual(
            this.campanha.mapa.getSalaPorPosicao(
                this.campanha.jogador.getX(),
                this.campanha.jogador.getY()
            )!
        );

        const resultado = await this.loopDeExploracao();
        return resultado;
    }

    private async loopDeExploracao(): Promise<ResultadoJogo> {
        let mapa = this.campanha.mapa;
        let jogador = this.campanha.jogador;

        console.log(
            this.save.campanha!.jogador ===
            this.save.campanha!.mapa.getEntidades()
                .find(e => e instanceof Jogador)
        );

        while (true) {
            console.clear();

            mapa.renderizar(jogador);

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
                    await this.salvar();
                    break;
                case "S":
                    mapa.moverEntidade(jogador, xAtual, yAtual + 1);
                    await this.salvar();
                    break;
                case "A":
                    mapa.moverEntidade(jogador, xAtual - 1, yAtual);
                    await this.salvar();
                    break;
                case "D":
                    mapa.moverEntidade(jogador, xAtual + 1, yAtual);
                    await this.salvar();
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
                    await this.salvar();
                    break;
                case "I":
                    MenuInventario.abrir(jogador);
                    await this.salvar();
                    break;
                case "Q":
                    console.log("Saindo do jogo...");
                    await this.salvar();
                    return ResultadoJogo.SAIU;
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
                await this.salvar();
                if (!jogador.estaVivo()) {
                    console.log("Game Over");
                    return ResultadoJogo.MORREU;
                }
            }
        }
    }
}