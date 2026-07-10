import { Mapa } from "@mapa/mapa.js";
import { Jogador } from "@personagens/tiposPersonagem/jogador.js";
import { Campanha } from "@save/campanha.js";
import { Save } from "@save/save.js";
import { ISaveManager } from "@persistencia/iSaveManager.js";

import { CriadorPersonagemTeste } from "@criacao/jogadorTeste.js";
import { GerenciadorTutorial } from "@mapa/salas/gerenciadorTutorial.js";
import { GerenciadorMensagens } from "./mensagens/gerenciadorMensagem.js";

export class GameController {
    private readonly saveManager: ISaveManager;
    private save: Save;
    private tutorial?: GerenciadorTutorial;
    private mensagens = new GerenciadorMensagens();

    constructor(saveManager: ISaveManager) {
        this.saveManager = saveManager;
        this.save = new Save();
    }

    public async inicializar(): Promise<void> {
        this.save = this.saveManager.criarNovo();

        const jogador = CriadorPersonagemTeste.criar();

        this.save.adicionarPersonagem(jogador);
    }

    public getCampanha(): Campanha | undefined {
        return this.save.getCampanha();
    }

    public possuiCampanhaAtiva(): boolean {
        return this.save.possuiCampanhaAtiva();
    }

    public getJogador(): Jogador | undefined {
        return this.save.getCampanha()?.getJogador();
    }

    public getMapa(): Mapa | undefined {
        return this.save.getCampanha()?.getMapa();
    }

    public getTutorial(): GerenciadorTutorial | undefined {
        return this.tutorial;
    }

    public getMensagens() {
        return this.mensagens;
    }

    public adicionarMensagem(texto: string): void {
        this.mensagens.adicionar(texto);
    }

    public async novoJogo(): Promise<boolean> {
        const personagens = this.save.getPersonagensDisponiveis();

        if (personagens.length === 0) {
            return false;
        }

        const campanha = new Campanha(personagens[0]);

        this.tutorial = new GerenciadorTutorial(campanha.getMapa(), campanha.getJogador());

        this.tutorial.iniciar();

        console.log(campanha.getJogador().getX(), campanha.getJogador().getY());
        console.log(campanha.getMapa().getEntidades().length);
        console.log(campanha.getMapa().getSalas().length);

        this.save.iniciarCampanha(campanha);

        await this.saveManager.salvar(this.save);

        return true;
    }

    public continuar(): boolean {
        console.log("Carregando save...");
        return true;
    }

    public sair(): void {
        console.log("Saindo...");
    }
}