import { Personagem } from "../personagens/personagem.ts";
import { Jogador } from "../personagens/jogador.ts";
import { EstadoTurno } from "./estadoTurno.ts";
import { RodadaIniciativa } from "./rodadaIniciativas.ts";

import { Item } from "../inventario/itens/item.ts";
import { Arma } from "../inventario/itens/arma.ts";
import { Armadura } from "../inventario/itens/armadura.ts";

import { Habilidade, TipoAlvo } from "../poderes/habilidades.ts";

import { TipoAcao } from "../poderes/habilidades.ts";

export class Turno {
    static executar(personagem: Personagem, participantes: Personagem[]): void {
        const estado = new EstadoTurno();

        console.log(`\n=== TURNO DE ${personagem.getNome()} ===`);

        const efeitoBloqueante = personagem.getEfeitos().find(e => !e.podeAgir());

        if (efeitoBloqueante) {
            console.log(`${personagem.getNome()} não pode agir devido a ${efeitoBloqueante.getNome()}.`);
            return;
        }

        if (personagem instanceof Jogador) {
            this.executarJogador(personagem, participantes, estado);
        } else {
            this.executarIA(personagem, participantes, estado);
        }
    }

    private static executarJogador(jogador: Jogador, participantes: Personagem[], estado: EstadoTurno) {
        while (true) {
            console.log("\n1 - Atacar");
            console.log("2 - Inventário");
            console.log("3 - Ver Status");
            console.log("4 - Habilidades")
            console.log("5 - Encerrar Turno");

            const opcao = prompt("Escolha:");

            switch (opcao) {
                case "1":
                    if (!estado.possuiAcaoPadrao()) {
                        console.log("Você já usou sua ação padrão.");
                        break;
                    }
                    const alvo = this.escolherAlvo(jogador, participantes);

                    if (!alvo) {
                        break;
                    }
                    jogador.atacar(alvo);
                    estado.usarAcaoPadrao()
                    break;
                case "2":
                    if (!estado.possuiAcaoMovimento()) {
                        console.log("Você já usou sua ação de movimento.");
                        break;
                    }
                    this.abrirInventario(jogador, estado);
                    break;
                case "3":
                    console.log(`${jogador.getNome()}`);
                    console.log(`PV: ${jogador.getVidaAtual()}/${jogador.getVidaMaxima()} | PM: ${jogador.getManaAtual()}/${jogador.getManaMaxima()}`);
                    console.log(`FOR: ${jogador.getForca()} | DES: ${jogador.getDestreza()} | CON: ${jogador.getConstituicao()} | INT: ${jogador.getInteligencia()} | SAB: ${jogador.getSabedoria()} | CAR: ${jogador.getCarisma()}`);
                    jogador.listarEfeitos();
                    break;
                case "4":
                    this.usarHabilidade(jogador, participantes, estado);
                    break;
                case "5":
                    return;
            }
        }
    }

    private static executarIA(inimigo: Personagem, participantes: Personagem[], estado: EstadoTurno): void {
        const alvos = participantes.filter(p => p.getTime() !== inimigo.getTime()
            && p.estaVivo());

        if (alvos.length === 0) {
            return;
        }

        const alvo = alvos[0];

        if (estado.possuiAcaoPadrao()) {
            inimigo.atacar(alvo);
            estado.usarAcaoPadrao();
        }
    }

    private static escolherAlvo(
        atacante: Personagem, participantes: Personagem[], habilidade?: Habilidade): Personagem | undefined {
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
            console.log(`${indice + 1} - ${alvo.getNome()} (PV ${alvo.getVidaAtual()}/${alvo.getVidaMaxima()})`);
        });

        const escolha = Number(prompt("Escolha:"));

        return alvos[escolha - 1];
    }

    private static abrirInventario(jogador: Jogador, estado: EstadoTurno): void {
        const itens = jogador.getInventario().getItens();

        if (itens.length === 0) {
            console.log("Inventário vazio.");
            return;
        }

        console.log("\n=== INVENTÁRIO ===");

        console.log("0 - Voltar");

        itens.forEach((item, indice) =>
            console.log(`${indice + 1} - ${item.getNome()}`));

        const escolha = Number(prompt("Escolha um item:"));

        if (escolha === 0) {
            return
        }

        const item = itens[escolha - 1];
        if (!item) {
            return;
        }

        const sucesso = this.usarItem(jogador, item);
        if (sucesso) {
            estado.usarAcaoMovimento();
        }
    }

    private static usarItem(jogador: Jogador, item: Item): boolean {
        if (item instanceof Arma) {
            jogador.equiparArma(item);

            console.log(`${item.getNome()} equipada.`);

            return true;
        }

        if (item instanceof Armadura) {
            jogador.equiparProtecao(item);

            console.log(`${item.getNome()} equipada.`);

            return true;
        }

        return false;
    }

    private static usarHabilidade(jogador: Jogador, participantes: Personagem[], estado: EstadoTurno): void {

        const habilidades = jogador.getHabilidades();

        if (habilidades.length === 0) {
            console.log("Nenhuma habilidade.");
            return;
        }

        console.log("\n=== HABILIDADES ===");

        habilidades.forEach((habilidade, indice) =>
            console.log(`${indice + 1} - ${habilidade.getNome()} (${habilidade.getCustoMana()} PM)`)
        );

        const escolha = Number(prompt("Escolha:"));

        const habilidade = habilidades[escolha - 1];

        if (!habilidade) {
            return;
        }

        let alvo: Personagem | undefined;

        if (habilidade.getPrecisaAlvo()) {

            alvo = this.escolherAlvo(jogador, participantes, habilidade);

            if (!alvo) {
                return;
            }
        }

        switch (habilidade.getTipoAcao()) {
            case TipoAcao.PADRAO:
                if (!estado.possuiAcaoPadrao()) {
                    console.log("Você já usou sua ação padrão.");
                    return;
                }
                let sucesso = habilidade.executar(jogador, alvo);
                if (sucesso) {
                    estado.usarAcaoPadrao();
                }
                return;
            case TipoAcao.MOVIMENTO:
                if (!estado.possuiAcaoMovimento()) {
                    console.log("Você já usou sua ação movimento.");
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
}

export class OrdemTurnos {
    static determinar(
        participantes: Personagem[]
    ): Personagem[] {

        const resultados =
            participantes.map(personagem => ({
                personagem,
                iniciativa:
                    RodadaIniciativa.rolar(personagem)
            }));

        resultados.sort(
            (a, b) =>
                b.iniciativa - a.iniciativa
        );

        return resultados.map(
            r => r.personagem
        );
    }
}