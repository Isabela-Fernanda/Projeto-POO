import { Jogador } from "../personagens/tiposPersonagem/jogador.js";
import { Campanha } from "./campanha.js";
import { Historico } from "./historico.js";

export class Save {
    personagensDisponiveis: Jogador[] = [];

    campanha?: Campanha;

    historico = new Historico();

    dataCriacao = new Date();
    ultimoSalvamento = new Date();

    versao = "0.1";

    adicionarPersonagem(personagem: Jogador) {
        this.personagensDisponiveis.push(personagem);
    }

    removerPersonagem(personagem: Jogador) {
        this.personagensDisponiveis =
            this.personagensDisponiveis.filter(p => p !== personagem);
    }

    iniciarCampanha(campanha: Campanha) {
        this.removerPersonagem(campanha.getJogador());
        this.campanha = campanha;
    }

    encerrarCampanha() {
        this.campanha = undefined;
    }

    possuiCampanhaAtiva(): boolean {
        return this.campanha !== undefined;
    }

    getPersonagensDisponiveis(): Jogador[] {
        return this.personagensDisponiveis;
    }

    getCampanha(): Campanha | undefined {
        return this.campanha;
    }

    getHistorico(): Historico {
        return this.historico;
    }
}