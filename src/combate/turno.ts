import { Personagem } from "../personagens/personagem.ts";
import { Jogador } from "../personagens/jogador.ts";
import { EstadoTurno } from "./estadoTurno.ts";
import { RodadaIniciativa } from "./rodadaIniciativas.ts";

import { Habilidade, TipoAlvo } from "../poderes/habilidades.ts";

import { TipoAcao } from "../poderes/habilidades.ts";
import { Mapa } from "../mapa/mapa.ts";
import { CatalogoArmas } from "../inventario/itens/catalogoArmas.ts";
import { ModoAtaque } from "./testes/testeAtaque.ts";
import { Monstro } from "../personagens/inimigo/monstro.ts";
import { Time } from "../personagens/time.ts";

import { MenuInventario } from "../inventario/menuInventario.ts";

export class Turno {
    static executar(personagem: Personagem, participantes: Personagem[], mapa: Mapa): void {
        const estado = new EstadoTurno();

        if (personagem.possuiHabilidade("Reflexos de Combate")) {
            estado.adicionarAcaoMovimentoExtra()
        }

        console.log(`\n=== TURNO DE ${personagem.getNome()} ===`);

        const efeitoBloqueante = personagem.getEfeitos().find(e => !e.podeAgir());

        if (efeitoBloqueante) {
            console.log(`${personagem.getNome()} não pode agir devido a ${efeitoBloqueante.getNome()}.`);
            return;
        }

        if (personagem instanceof Jogador) {
            this.executarJogador(personagem, participantes, mapa, estado);
        } else if (personagem instanceof Monstro) {
            personagem.executarTurno(participantes, mapa, estado);
        }
    }

    private static obterNomeAcao(tipo: TipoAcao): string {
        switch (tipo) {
            case TipoAcao.LIVRE: return "Livre";
            case TipoAcao.MOVIMENTO: return "Movimento";
            case TipoAcao.PADRAO: return "Padrão";
            case TipoAcao.COMPLETA: return "Completa";
            case TipoAcao.REACAO: return "Reação";
        }
    }

    private static executarJogador(jogador: Jogador, participantes: Personagem[], mapa: Mapa, estado: EstadoTurno) {
        mapa.renderizar();

        const salaAtual = jogador.getSalaAtual();

        if (!salaAtual) { return; }

        for (const entidade of mapa.getEntidadesDaSala(salaAtual)) {
            console.log(`${entidade.getNome()} (${entidade.getX()}, ${entidade.getY()})`);
        }

        while (true) {
            console.log("\n1 - Mover")
            console.log("2 - Atacar");
            console.log("3 - Inventário");
            console.log("4 - Ver Status");
            console.log("5 - Habilidades")
            console.log("6 - Encerrar Turno");

            const opcao = prompt("Escolha:");

            switch (opcao) {
                case "1":
                    if (!estado.possuiAcaoMovimento()) {
                        console.log("Você já usou sua ação de movimento.");
                        break;
                    }
                    this.mover(jogador, mapa, estado);
                    break;
                case "2":
                    if (!estado.possuiAcaoPadrao()) {
                        console.log("Você já usou sua ação padrão.");
                        break;
                    }
                    if (jogador.getRaca().getNome() === "Minotauro" && !jogador.possuiAtaqueBonus("Chifrada")) {
                        jogador.adicionarAtaqueBonus("Chifrada", CatalogoArmas.CHIFRE);
                    }
                    if (jogador.getRaca().getNome() === "Trog" && !jogador.possuiAtaqueBonus("Mordida")) {
                        jogador.adicionarAtaqueBonus("Mordida", CatalogoArmas.MORDIDA);
                    }

                    const alvo = this.escolherAlvo(jogador, participantes, mapa);

                    if (!alvo) {
                        break;
                    }

                    const distancia = mapa.calcularDistancia(jogador.getX(), jogador.getY(), alvo.getX(), alvo.getY());

                    if (!jogador.possuiArmaNoAlcance(distancia)) {
                        console.log("Alvo fora de alcance.");
                        break;
                    }

                    const ataquesPossiveis = jogador.obterAtaquesPossiveis(distancia);

                    if (ataquesPossiveis.length === 0) {
                        console.log("Nenhuma arma alcança o alvo.");
                        break
                    }

                    console.log("\n=== ESCOLHA O ATAQUE ===");

                    ataquesPossiveis.forEach((ataque, i) => {
                        console.log(`${i + 1} - ${ataque.arma.getNome()} (${ModoAtaque[ataque.modoAtaque]})`);
                    });
                    const escolha = Number(prompt("Escolha:"));
                    const ataque = ataquesPossiveis[escolha - 1];

                    if (!ataque) {
                        break;
                    }

                    if (ataquesPossiveis)
                        if (jogador.getEquipamento().estaUsandoDuasArmas()) {
                            for (let i = 0; i < jogador.getQuantidadeAtaques(); i++) {
                                jogador.atacarComDuasArmas(alvo, mapa, ataquesPossiveis);
                            }
                            jogador.consumirAtaquesExtrasTemporarios();
                        } else {
                            for (let i = 0; i < jogador.getQuantidadeAtaques(); i++) {
                                jogador.atacar(alvo, mapa, ataque.arma, ataque.modoAtaque);
                            }
                            jogador.consumirAtaquesExtrasTemporarios();
                        }

                    const ehAtaqueCorpoACorpo = ataquesPossiveis.some(ataque => ataque.modoAtaque === ModoAtaque.CORPO_A_CORPO);

                    if (ehAtaqueCorpoACorpo) {
                        if (jogador.getRaca().getNome() === "Minotauro" || jogador.getRaca().getNome() === "Trog") {
                            const escolha = prompt("Deseja gastar 1PM para realizar um ataque com sua arma natural? (s/n)");

                            if (escolha?.toLowerCase() !== "s") {
                                estado.usarAcaoPadrao();
                                break;
                            }

                            if (!jogador.gastarMana(1)) {
                                console.log("Mana insuficente! Não é possível realizar o ataque.");
                                estado.usarAcaoPadrao();
                                break;
                            }

                            for (const ataqueBonus of jogador.getAtaquesBonus()) {
                                jogador.atacar(alvo, mapa, ataqueBonus.arma, ModoAtaque.CORPO_A_CORPO);
                            }
                            if (jogador.getRaca().getNome() === "Minotauro") {
                                jogador.removerAtaqueBonus("Chifrada");
                            }
                            if (jogador.getRaca().getNome() === "Trog") {
                                jogador.removerAtaqueBonus("Mordida");
                            }
                        }
                    }
                    estado.usarAcaoPadrao()
                    break;
                case "3":
                    if (!estado.possuiAcaoMovimento()) {
                        console.log("Você já usou sua ação de movimento.");
                        break;
                    }
                    if (MenuInventario.abrir(jogador)) {
                        estado.usarAcaoMovimento();
                    }
                    break;
                case "4":
                    const sala = mapa.getSalaDaEntidade(jogador);
                    console.log(sala ? `Sala: ${sala.getNome()}` : "Fora de sala");
                    console.log(`Deslocamento: ${jogador.getDeslocamento()}`)
                    console.log(`${jogador.getNome()}`);
                    console.log(`Posição: (${jogador.getX()}, ${jogador.getY()})`)
                    console.log(`PV: ${jogador.getVidaAtual()}/${jogador.getVidaMaxima()} | PM: ${jogador.getManaAtual()}/${jogador.getManaMaxima()}`);
                    console.log(`FOR: ${jogador.getForca()} | DES: ${jogador.getDestreza()} | CON: ${jogador.getConstituicao()} | INT: ${jogador.getInteligencia()} | SAB: ${jogador.getSabedoria()} | CAR: ${jogador.getCarisma()}`);
                    jogador.listarEfeitos();
                    break;
                case "5":
                    this.abrirMenuHabilidades(jogador, participantes, estado, mapa);
                    break;
                case "6":
                    return;
            }
        }
    }

    private static mover(jogador: Jogador, mapa: Mapa, estado: EstadoTurno) {
        const x = Number(prompt("Destino X:"));
        const y = Number(prompt("Destino Y:"));

        const sucesso = mapa.moverEntidade(jogador, x, y);

        if (sucesso) {
            console.log("Movimento realizado.");
            estado.usarAcaoMovimento();
        } else {
            console.log("Não foi possível mover.");
        }
    }

    private static escolherAlvo(
        atacante: Personagem, participantes: Personagem[], mapa: Mapa, habilidade?: Habilidade): Personagem | undefined {
        let alvos = participantes.filter(p => p.getTime() !== atacante.getTime() && p.estaVivo());

        switch (habilidade?.getTipoAlvo()) {
            case TipoAlvo.QUALQUER:
                alvos = participantes.filter(p => p.estaVivo());
                break;
            case TipoAlvo.ALIADO:
                alvos = participantes.filter(p => p.getTime() === atacante.getTime() && p.estaVivo());
                break;
            case TipoAlvo.INIMIGO:
                alvos = participantes.filter(p => p.getTime() !== atacante.getTime() && p.estaVivo());
                break;
            case TipoAlvo.PROPRIO:
                alvos = [atacante];
                break;
        }

        if (alvos.length === 0) {
            console.log("Nenhum alvo disponível.");
            return undefined;
        }

        console.log("\n=== ESCOLHA O ALVO ===");

        alvos.forEach((alvo, indice) => {
            console.log(`${indice + 1} - ${alvo.getNome()} (PV ${alvo.getVidaAtual()}/${alvo.getVidaMaxima()} | ${mapa.calcularDistancia(atacante.getX(), atacante.getY(), alvo.getX(), alvo.getY())}m)`);
        });

        const escolha = Number(prompt("Escolha:"));

        return alvos[escolha - 1];
    }

    private static abrirMenuHabilidades(jogador: Jogador, participantes: Personagem[], estado: EstadoTurno, mapa: Mapa): void {
        const habilidades = jogador.getHabilidades();

        if (habilidades.length === 0) {
            console.log("Nenhuma habilidade.");
            return;
        }

        while (true) {
            console.log("\n=== HABILIDADES ===");
            console.log("0 - Voltar");
            console.log("D - Ver descrições\n");

            habilidades.forEach((habilidade, indice) => {
                const status = habilidade.estaAtiva() ? " [ATIVA]" : "";

                console.log(`${indice + 1} - ${habilidade.getNome()}${status} (${habilidade.getCustoMana()}PM)`);
            });

            const escolha = prompt("Escolha:");

            if (escolha === "0") {
                return;
            }

            if (escolha?.toUpperCase() === "D") {
                this.exibirDescricoesHabilidades(habilidades);
                continue;
            }

            const indice = Number(escolha) - 1;
            const habilidade = habilidades[indice];

            if (!habilidade) {
                continue;
            }

            this.executarHabilidade(jogador, habilidade, participantes, estado, mapa);

            return;
        }
    }

    private static exibirDescricoesHabilidades(habilidades: Habilidade[]): void {
        console.log("\n=== DESCRIÇÕES ===");

        habilidades.forEach((habilidade, indice) => {
            console.log(`\n${indice + 1} - ${habilidade.getNome()}`);
            console.log(`Tipo: ${this.obterNomeAcao(habilidade.getTipoAcao())}`);
            console.log(`Custo: ${habilidade.getCustoMana()} PM`);
            console.log(habilidade.getDescricao());
        });

        prompt("\nEnter para voltar...");
    }

    private static executarHabilidade(jogador: Jogador, habilidade: Habilidade, participantes: Personagem[], estado: EstadoTurno, mapa: Mapa): void {
        let alvo: Personagem | undefined;

        if (habilidade.getPrecisaAlvo()) {
            alvo = this.escolherAlvo(jogador, participantes, mapa, habilidade);

            if (!alvo) {
                return;
            }
        }

        let sucesso: boolean;

        switch (habilidade.getTipoAcao()) {
            case TipoAcao.PADRAO:
                if (!estado.possuiAcaoPadrao()) {
                    console.log("Você já usou sua ação padrão.");
                    return;
                }

                sucesso = habilidade.executar(jogador, alvo);

                if (sucesso) {
                    estado.usarAcaoPadrao();
                }
                return;
            case TipoAcao.MOVIMENTO:
                if (!estado.possuiAcaoMovimento()) {
                    console.log("Você já usou sua ação de movimento.");
                    return;
                }

                sucesso = habilidade.executar(jogador, alvo);

                if (sucesso) {
                    estado.usarAcaoMovimento();
                }
                return;
            case TipoAcao.LIVRE:
                habilidade.executar(jogador, alvo);
                return;
            case TipoAcao.REACAO:
                console.log("Reações ainda não implementadas.");
                return;
            case TipoAcao.COMPLETA:
                console.log("Ações completas ainda não implementadas.");
                return;
        }
    }

    private static combateEncerrado(participantes: Personagem[]): boolean {
        const jogadoresVivos = participantes.some(
            p => p.getTime() === Time.HEROIS && p.estaVivo()
        );

        const inimigosVivos = participantes.some(
            p => p.getTime() === Time.INIMIGOS && p.estaVivo()
        );

        return !jogadoresVivos || !inimigosVivos;
    }
}

export class OrdemTurnos {
    static determinar(participantes: Personagem[]): Personagem[] {
        const resultados = participantes.map(personagem => ({
            personagem,
            iniciativa: RodadaIniciativa.rolar(personagem)
        }));

        resultados.sort((a, b) => b.iniciativa - a.iniciativa);

        return resultados.map(r => r.personagem);
    }
}