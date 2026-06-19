import { Personagem } from "../../personagens/personagem.ts";
import { TipoDano } from "../../combate/tipoDano.ts";
import { TipoAtributo } from "../../personagens/atributos/atributos.ts";

import { CalcularResistencia } from "../../combate/calcular/calcularResistencia.ts"

import { Condicao } from "../../combate/tipoCondicao.ts";
import { EfeitoCondicao } from "../efeitos/efeitoCondicao.ts"

export class UtilitarioMagia {
    static causarDano(alvo: Personagem, dano: number, tipo: TipoDano): void {
        const resistencia = alvo.getResistencia(tipo);
        dano = Math.max(0, dano - resistencia);
        alvo.receberDano(dano);
        console.log(`${alvo.getNome()} sofreu ${dano} de dano ${tipo}.`);
    }
}

export class UtilitarioResistencia {
    static testar(alvo: Personagem, tipoDano: TipoDano, cd: number): boolean {
        const resultado = CalcularResistencia.executarCalculo(alvo, tipoDano, cd);
        return resultado.sucesso;
    }
}

export class UtilitarioCondicao {
    static aplicar(alvo: Personagem, nome: string, condicao: Condicao, duracao: number): void {
        alvo.adicionarEfeito(new EfeitoCondicao(nome, condicao, duracao));
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
    constructor(
        private raio: number
    ) { }
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
