import { Personagem } from "../../personagens/personagem.ts";
import { TipoDano } from "../../combate/tipoDano.ts";
import { TipoAtributo } from "../../personagens/atributos/atributos.ts";

import { CalcularResistencia } from "../../combate/calcular/calcularResistencia.ts"

import { Condicao } from "../../combate/tipoCondicao.ts";

import { Efeito } from "../efeito.ts";
import { EfeitoAbalado, EfeitoAmedrontado, EfeitoApavorado, EfeitoAtordoado, EfeitoCaido, EfeitoCamuflado, EfeitoCego, EfeitoDesequilibrado, EfeitoEnredado, EfeitoEnvenenado, EfeitoFatigado, EfeitoFascinado, EfeitoInconsciente, EfeitoOfuscado, EfeitoParalisado, EfeitoPasmo, EfeitoQueimando, EfeitoSangrando, EfeitoVulneravel } from "../efeitos/efeitoCondicao.ts"

export class UtilitarioMagia {
    static causarDano(alvo: Personagem, dano: number, tipo: TipoDano): void {
        const resistencia = alvo.getResistencia(tipo);
        dano = Math.max(0, dano - resistencia);
        alvo.receberDano(dano);
    }
}

export class UtilitarioResistencia {
    static testar(alvo: Personagem, tipoDano: TipoDano, cd: number): boolean {
        const resultado = CalcularResistencia.executarCalculo(alvo, tipoDano, cd);
        return resultado.sucesso;
    }
}

export class UtilitarioCondicao {
    static aplicar(alvo: Personagem, condicao: Condicao, duracao: number): void {
        let efeito: Efeito | null = null;

        switch (condicao) {
            case Condicao.ABALADO:
                efeito = new EfeitoAbalado(duracao);
                break;
            case Condicao.AMEDRONTADO:
                efeito = new EfeitoAmedrontado(duracao);
                break;
            case Condicao.APAVORADO:
                efeito = new EfeitoApavorado(duracao);
                break;
            case Condicao.ATORDOADO:
                efeito = new EfeitoAtordoado(duracao);
                break;
            case Condicao.CAIDO:
                efeito = new EfeitoCaido(duracao);
                break;
            case Condicao.CAMUFLADO:
                efeito = new EfeitoCamuflado(duracao);
                break;
            case Condicao.CEGO:
                efeito = new EfeitoCego(duracao);
                break;
            case Condicao.DESEQUILIBRADO:
                efeito = new EfeitoDesequilibrado(duracao);
                break;
            case Condicao.ENREDADO:
                efeito = new EfeitoEnredado(duracao);
                break;
            case Condicao.ENVENENADO:
                efeito = new EfeitoEnvenenado(duracao);
                break;
            case Condicao.FATIGADO:
                efeito = new EfeitoFatigado(duracao);
                break;
            case Condicao.FASCINADO:
                efeito = new EfeitoFascinado(duracao);
                break;
            case Condicao.INCONSCIENTE:
                efeito = new EfeitoInconsciente(duracao);
                break;
            case Condicao.OFUSCADO:
                efeito = new EfeitoOfuscado(duracao);
                break;
            case Condicao.PARALISADO:
                efeito = new EfeitoParalisado(duracao);
                break;
            case Condicao.PASMO:
                efeito = new EfeitoPasmo(duracao);
                break;
            case Condicao.QUEIMANDO:
                efeito = new EfeitoQueimando(duracao);
                break;
            case Condicao.SANGRANDO:
                efeito = new EfeitoSangrando(duracao);
                break;
            case Condicao.VULNERAVEL:
                efeito = new EfeitoVulneravel(duracao);
                break;
            default:
                console.warn(`Condição genérica ou não mapeada recebida: ${condicao}`);
                break;
        }

        if (efeito && alvo.estaVivo()) {
            alvo.adicionarEfeito(efeito);
            console.log(`O efeito de [${efeito.getNome()}] foi aplicado em ${alvo.getNome()} por ${duracao} rodadas.`);
        }
    }
}

export class UtilitarioCura {
    static curar(alvo: Personagem, quantidade: number): void {
        alvo.regenerarVida(quantidade);
        console.log(`${alvo.getNome()} recuperou ${quantidade} PV.`);
    }
}

export class UtilitarioInvocacao {
    static invocar(conjurador: Personagem, criatura: Personagem): void {
        conjurador.adicionarInvocacao(criatura);
        console.log(`${conjurador.getNome()} invocou ${criatura.getNome()}`);
    }
}

// ======================================================================
// AREA
// ======================================================================

export interface AreaMagica {
    obterAlvos(centroX: number, centroY: number, conjurador: Personagem, criaturas: Personagem[]): Personagem[];
}

export class AreaInimigos implements AreaMagica {
    obterAlvos(centroX: number, centroY: number, conjurador: Personagem, criaturas: Personagem[]): Personagem[] {
        return criaturas.filter(criatura => criatura.getTime() !== conjurador.getTime());
    }
}

export class AreaAliados implements AreaMagica {
    obterAlvos(centroX: number, centroY: number, conjurador: Personagem, criaturas: Personagem[]): Personagem[] {
        return criaturas.filter(criatura => criatura.getTime() === conjurador.getTime());
    }
}

export class AreaTodos implements AreaMagica {
    obterAlvos(centroX: number, centroY: number, conjurador: Personagem, criaturas: Personagem[]): Personagem[] {
        return criaturas;
    }
}

export class AreaCircular implements AreaMagica {
    constructor(private raio: number) { }
    getRaio(): number {
        return this.raio;
    }

    obterAlvos(centroX: number, centroY: number, conjurador: Personagem, criaturas: Personagem[]): Personagem[] {
        return criaturas.filter(criatura => {
            const dx = criatura.getX() - centroX;
            const dy = criatura.getY() - centroY;

            return (Math.sqrt(dx * dx + dy * dy) <= this.raio);
        });
    }
}

export class AreaCilindrica implements AreaMagica {
    constructor(
        private raio: number,
        private altura: number
    ) { }
    getRaio(): number {
        return this.raio;
    }

    getAltura(): number {
        return this.altura;
    }

    obterAlvos(centroX: number, centroY: number, conjurador: Personagem, criaturas: Personagem[]): Personagem[] {
        return criaturas.filter(criatura => {
            const dx = criatura.getX() - centroX;
            const dy = criatura.getY() - centroY;

            return (Math.sqrt(dx * dx + dy * dy) <= this.raio);
        });
    }
}

export class FiltroInimigos {
    static aplicar(conjurador: Personagem, criaturas: Personagem[]
    ) {
        return criaturas.filter(c => c.getTime() !== conjurador.getTime());
    }
}

export class UtilitarioTransformacao {
    static aumentarAtributo(alvo: Personagem, atributo: TipoAtributo, valor: number): void {
        alvo.adicionarBonusAtributo(atributo, valor);
    }

    static reduzirAtributo(alvo: Personagem, atributo: TipoAtributo, valor: number): void {
        alvo.removerBonusAtributo(atributo, valor);
    }
}
