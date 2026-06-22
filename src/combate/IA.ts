import { Personagem } from "../personagens/personagem.ts";
import { Mapa } from "../mapa/mapa.ts";
import { EstadoTurno } from "./estadoTurno.ts";
import { AtaquePossivel, ModoAtaque } from "./testes/testeAtaque.ts";

/* 
IMPLEMENTAR DEPOIS
    IACovarde
    IABrutamontes
    IABoss
    IASuporte
    IANecromante
*/

export interface ComportamentoIA {
    executar(criatura: Personagem, participantes: Personagem[], mapa: Mapa, estado: EstadoTurno): void;
}

export abstract class IABase implements ComportamentoIA {
    abstract executar(criatura: Personagem, participantes: Personagem[], mapa: Mapa, estado: EstadoTurno): void;

    protected encontrarAlvoMaisProximo(criatura: Personagem, participantes: Personagem[], mapa: Mapa): Personagem | null {
        const alvos = participantes.filter(p => p.getTime() !== criatura.getTime() && p.estaVivo());

        if (alvos.length === 0) return null;

        let alvoEscolhido = alvos[0];
        let menorDistancia = mapa.calcularDistancia(criatura.getX(), criatura.getY(), alvoEscolhido.getX(), alvoEscolhido.getY());

        for (const alvo of alvos) {
            const distancia = mapa.calcularDistancia(criatura.getX(), criatura.getY(), alvo.getX(), alvo.getY());
            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                alvoEscolhido = alvo;
            }
        }
        return alvoEscolhido;
    }

    protected moverEmDirecao(criatura: Personagem, alvo: Personagem, mapa: Mapa, aproximar: boolean): boolean {
        let moveu = false;

        const deslocamento = criatura.getDeslocamento();

        for (let i = 0; i < deslocamento; i++) {
            const direcaoMultiplicador = aproximar ? 1 : -1;
            const novoX = criatura.getX() + (Math.sign(alvo.getX() - criatura.getX()) * direcaoMultiplicador);
            const novoY = criatura.getY() + (Math.sign(alvo.getY() - criatura.getY()) * direcaoMultiplicador);

            console.log(
                `${criatura.getNome()} tentando mover para (${novoX}, ${novoY})`
            );

            if (!mapa.moverEntidade(criatura, novoX, novoY)) {
                break;
            }
            moveu = true;
        }
        return moveu;
    }

    protected escolherMelhorAtaque(ataques: AtaquePossivel[], preferirDistancia = false): AtaquePossivel | undefined {
        if (ataques.length === 0) return undefined;

        if (preferirDistancia) {
            const ataquesDistancia = ataques.filter(a => a.modoAtaque === ModoAtaque.DISTANCIA);
            if (ataquesDistancia.length > 0) {
                ataques = ataquesDistancia;
            }
        }

        return ataques.reduce((melhor, atual) => {
            const danoMelhor = melhor.arma.getQuantidadeDados() * melhor.arma.getFacesDado();
            const danoAtual = atual.arma.getQuantidadeDados() * atual.arma.getFacesDado();
            return danoAtual > danoMelhor ? atual : melhor;
        });
    }

    protected executarAtaque(criatura: Personagem, alvo: Personagem, mapa: Mapa, ataque: AtaquePossivel): void {
        if (criatura.getEquipamento().estaUsandoDuasArmas()) {
            const ataques = criatura.obterAtaquesPossiveis(mapa.calcularDistancia(criatura.getX(), criatura.getY(), alvo.getX(), alvo.getY()));
            criatura.atacarComDuasArmas(alvo, mapa, ataques);
        } else {
            for (let i = 0; i < criatura.getQuantidadeAtaques(); i++) {
                criatura.atacar(alvo, mapa, ataque.arma, ataque.modoAtaque);
            }
            criatura.consumirAtaquesExtrasTemporarios();
        }
    }
}

export class IAAgressiva extends IABase {
    executar(inimigo: Personagem, participantes: Personagem[], mapa: Mapa, estado: EstadoTurno): void {
        const alvo = this.encontrarAlvoMaisProximo(inimigo, participantes, mapa);

        if (!alvo) return;

        let distancia = mapa.calcularDistancia(inimigo.getX(), inimigo.getY(), alvo.getX(), alvo.getY());
        const alcance = inimigo.getAlcanceAtaque();

        console.log(
            `${inimigo.getNome()} -> Distância: ${distancia} | Alcance: ${alcance}`
        );
        if (estado.possuiAcaoMovimento() && distancia > alcance) {
            if (this.moverEmDirecao(inimigo, alvo, mapa, true)) {
                console.log("Movimento bem sucedido");
                estado.usarAcaoMovimento();
            }
        }

        distancia = mapa.calcularDistancia(inimigo.getX(), inimigo.getY(), alvo.getX(), alvo.getY());
        const ataquesPossiveis = inimigo.obterAtaquesPossiveis(distancia);

        console.log(
            "Ataques possíveis:",
            ataquesPossiveis.map(a => a.arma.getNome())
        );
        console.log(
            "Arma principal:",
            inimigo.getEquipamento().getArmaPrincipal().getNome()
        );

        if (estado.possuiAcaoPadrao() && ataquesPossiveis.length > 0) {
            const ataque = this.escolherMelhorAtaque(ataquesPossiveis);
            if (ataque) {
                this.executarAtaque(inimigo, alvo, mapa, ataque);
                estado.usarAcaoPadrao();
            }
        }
    }
}

export class IAArqueira extends IABase {
    executar(arqueiro: Personagem, participantes: Personagem[], mapa: Mapa, estado: EstadoTurno): void {
        const alvo = this.encontrarAlvoMaisProximo(arqueiro, participantes, mapa);
        if (!alvo) return;

        const distanciaSegura = 3;
        let distancia = mapa.calcularDistancia(arqueiro.getX(), arqueiro.getY(), alvo.getX(), alvo.getY());

        if (estado.possuiAcaoMovimento()) {
            if (distancia < distanciaSegura) {
                if (this.moverEmDirecao(arqueiro, alvo, mapa, false)) {
                    estado.usarAcaoMovimento();
                }
            } else if (distancia > arqueiro.getAlcanceAtaque()) {
                if (this.moverEmDirecao(arqueiro, alvo, mapa, true)) {
                    estado.usarAcaoMovimento();
                }
            }
        }

        distancia = mapa.calcularDistancia(arqueiro.getX(), arqueiro.getY(), alvo.getX(), alvo.getY());
        const ataquesPossiveis = arqueiro.obterAtaquesPossiveis(distancia);

        if (estado.possuiAcaoPadrao() && ataquesPossiveis.length > 0) {
            const ataque = this.escolherMelhorAtaque(ataquesPossiveis, true);
            if (ataque) {
                this.executarAtaque(arqueiro, alvo, mapa, ataque);
                estado.usarAcaoPadrao();
            }
        }
    }
}

export class IAConjuradora extends IABase {
    constructor(
        private habilidadesPreferidas: string[]
    ) {
        super();
    }

    executar(conjurador: Personagem, participantes: Personagem[], mapa: Mapa, estado: EstadoTurno) {
        const alvo = this.encontrarAlvoMaisProximo(conjurador, participantes, mapa);
        if (!alvo) return;

        const possuiMana = conjurador.getManaAtual() > 0;

        if (possuiMana && this.habilidadesPreferidas.length > 0 && estado.possuiAcaoPadrao()) {
            const habilidadesDisponiveis = conjurador.getHabilidades().filter(
                h => this.habilidadesPreferidas.includes(h.getNome())
            );

            const habilidade = habilidadesDisponiveis[Math.floor(Math.random() * habilidadesDisponiveis.length)];

            if (habilidade) {
                const sucesso = habilidade.executar(conjurador, alvo);
                if (sucesso) {
                    estado.usarAcaoPadrao();
                }
            }
            console.log(`${conjurador.getNome()} conjura a magia ${habilidade?.getNome()} em ${alvo.getNome()}!`);
        } else {
            let distancia = mapa.calcularDistancia(conjurador.getX(), conjurador.getY(), alvo.getX(), alvo.getY());

            if (estado.possuiAcaoMovimento() && distancia > conjurador.getAlcanceAtaque()) {
                this.moverEmDirecao(conjurador, alvo, mapa, true);
                estado.usarAcaoMovimento();
            }

            distancia = mapa.calcularDistancia(conjurador.getX(), conjurador.getY(), alvo.getX(), alvo.getY());
            const ataquesPossiveis = conjurador.obterAtaquesPossiveis(distancia);

            if (estado.possuiAcaoPadrao() && ataquesPossiveis.length > 0) {
                const ataque = this.escolherMelhorAtaque(ataquesPossiveis);
                if (ataque) {
                    this.executarAtaque(conjurador, alvo, mapa, ataque);
                    estado.usarAcaoPadrao();
                }
            }
        }
    }
}
