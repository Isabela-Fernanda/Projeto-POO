import { CriacaoPersonagem } from "@criacao/criarPersonagem.js";
import { Mapa } from "@mapa/mapa.js";
import { GerenciadorTutorial } from "@mapa/salas/gerenciadorTutorial.js";
import { Jogo } from "@app/jogo.js";

import { Campanha } from "@save/campanha.js";
import { Save } from "@save/save.js";
import { SaveManager } from "./saveManager.js";

export enum ResultadoJogo {
    SAIU,
    MORREU,
    VENCEU
}

export class MenuInicial {
    private save!: Save;

    async abrir() {
        await this.carregarSave();

        let executando = true;

        while (executando) {
            console.clear();
            this.exibirMenu();

            const opcao = Number(prompt("\nEscolha uma opção:"));

            switch (opcao) {
                case 1:
                    await this.continuarOuIniciarJornada();
                    break;
                case 2:
                    await this.criarPersonagem();
                    break;
                case 3:
                    this.listarPersonagens();
                    break;
                case 4:
                    this.mostrarHistorico();
                    break;
                case 5:
                    executando = false;
                    break;
                default:
                    console.log("Opção inválida.");
                    prompt("Pressione ENTER...");
            }
        }
    }

    private async carregarSave() {
        if (await SaveManager.existeSave()) {
            this.save = await SaveManager.carregar();
        }
        else {
            this.save = SaveManager.criarNovo();
            await SaveManager.salvar(this.save);
        }
    }

    private exibirMenu() {
        console.log("====== RPG TORMENTA ======");

        if (this.save.possuiCampanhaAtiva()) {
            const jogador = this.save.getCampanha()!.jogador;

            console.log("1 - Continuar Jornada");
            console.log('   Personagem: ' + jogador.getNome());
            console.log('   Nível: ' + jogador.getNivel());
            console.log('   Classe: ' + jogador.getClasse()?.getNome());
        } else {
            console.log("1 - Iniciar Jornada");
        }

        console.log();
        console.log("2 - Criar Personagem");
        console.log("3 - Personagens");
        console.log("4 - Histórico");
        console.log("5 - Sair");
    }

    private async criarPersonagem() {
        console.clear();
        const personagem = CriacaoPersonagem.criar();
        this.save.adicionarPersonagem(personagem);
        await SaveManager.salvar(this.save);
        console.log("\nPersonagem criado com sucesso.");
        prompt("ENTER...");
    }

    private listarPersonagens() {
        console.clear();
        console.log("=== PERSONAGENS ===");
        const personagens = this.save.getPersonagensDisponiveis();

        if (personagens.length === 0) {
            console.log("Nenhum personagem criado.");
            prompt("ENTER...");
            return;
        }

        personagens.forEach((personagem, indice) => { console.log(`${indice + 1} - ${personagem.getNome()}`); });
        prompt("ENTER...");
    }

    private mostrarHistorico() {
        console.clear();
        const historico = this.save.getHistorico();
        console.log("=== HISTÓRICO ===");
        console.log(`Mortes: ${historico.totalMortes}`);
        console.log(`Monstros mortos: ${historico.monstrosMortos}`);
        console.log(`Tesouros: ${historico.tesourosEncontrados}`);
        prompt("ENTER...");
    }

    private async continuarOuIniciarJornada() {
        if (this.save.possuiCampanhaAtiva()) {
            const jogo = new Jogo(this.save.campanha!, this.save);
            const resultado = await jogo.iniciar();
            await this.processarResultado(resultado);
            return;
        }
        await this.iniciarNovaCampanha();
    }

    private async iniciarNovaCampanha() {
        const jogador = this.escolherPersonagem();
        if (!jogador) return;

        const campanha = new Campanha(jogador);
        this.save.iniciarCampanha(campanha);
        await SaveManager.salvar(this.save);
        const jogo = new Jogo(this.save.campanha!, this.save);
        const resultado = await jogo.iniciar();
        await this.processarResultado(resultado);
    }

    private async processarResultado(resultado: ResultadoJogo) {
        switch (resultado) {
            case ResultadoJogo.MORREU:
                this.save.encerrarCampanha();
                break;
            case ResultadoJogo.VENCEU:
                this.save.encerrarCampanha();
                break;
            case ResultadoJogo.SAIU:
                break;
        }

        await SaveManager.salvar(this.save);
    }

    private escolherPersonagem() {
        const personagens = this.save.getPersonagensDisponiveis();

        if (personagens.length === 0) {
            console.log("Não há personagens.");
            prompt("ENTER...");
            return;
        }

        console.clear();
        console.log("=== ESCOLHER PERSONAGEM ===");

        personagens.forEach((personagem, indice) => { console.log(`${indice + 1} - ${personagem.getNome()}`); });

        const escolha = Number(prompt("\nEscolha:")) - 1;

        if (escolha < 0 || escolha >= personagens.length) {
            console.log("Escolha inválida.");
            prompt("ENTER...");
            return;
        }
        return personagens[escolha];
    }
}