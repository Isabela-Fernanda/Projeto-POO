import { Personagem } from "../../personagens/personagem.ts";
import { ResultadoAtaque, ResultadoAtaques } from "../resultados/resultadoAtaque.ts";
import { CalcularDano } from "../calcular/calcularDano.ts";
import { CalcularAtaque } from "../calcular/calcularAtaque.ts"; 
import { Arma } from "../../itens/arma.ts";

export enum ModoAtaque {
    CORPO_A_CORPO,
    ARREMESSO,
    DISTANCIA
}

export interface AtaquePossivel {
    arma: Arma;
    modoAtaque: ModoAtaque;
}

export class TesteAtaque {
    static executarAtaque(atacante: Personagem, alvo: Personagem, arma: Arma, modoAtaque: ModoAtaque, penalidade?: number): ResultadoAtaque {
        const resultadoAtaque = CalcularAtaque.calcular(atacante, arma, modoAtaque);

        resultadoAtaque.total += (penalidade ?? 0);

        const margemCritico = arma.getMargemCritico() ?? 20;

        let acertou: boolean;

        if(resultadoAtaque.rolagem === 1){
            acertou = false;
        } else if (resultadoAtaque.rolagem === 20){
            acertou = true;
        } else{
            acertou = resultadoAtaque.total >= alvo.getDefesa();
        }

        const critico = acertou && resultadoAtaque.rolagem >= margemCritico;

        let dano = acertou ? (CalcularDano.calcularDano(atacante, arma, modoAtaque, critico)) : 0;

        const resistencia = alvo.getResistencia(arma.getTipoDano());

        dano = Math.max(0, dano - resistencia);

        return new ResultadoAtaque(resultadoAtaque.rolagem, resultadoAtaque.total, acertou, critico, dano);
    }

    static executarAtaqueDuplo(atacante: Personagem, alvo: Personagem, arma: Arma, modoAtaque: ModoAtaque): ResultadoAtaques {
        const primeiro = this.executarAtaque(atacante, alvo, arma, modoAtaque);
        const segundo = this.executarAtaque(atacante, alvo, arma, modoAtaque);

        return {ataques: [primeiro, segundo]};
    }
}
