import { Personagem } from "../../personagens/personagem.ts";
import { ResultadoAtaque } from "../resultados/resultadoAtaque.ts";
import { CalcularDano } from "../calcular/calcularDano.ts";
import { CalcularAtaque } from "../calcular/calcularAtaque.ts";

export class TesteAtaque {
    static executarAtaque(atacante: Personagem, alvo: Personagem): ResultadoAtaque {
        const resultadoAtaque = CalcularAtaque.calcular(atacante);

        const arma = atacante.getEquipamento().getArma();

        const margemCritico = arma?.getMargemCritico() ?? 20;

        const acertou = resultadoAtaque.total >= alvo.getDefesa();

        const critico = acertou && resultadoAtaque.rolagem >= margemCritico;

        const dano =acertou ? CalcularDano.calcularDano(atacante, critico) : 0;

        // Falta adicionar a resistencia do alvo ao dano

        return new ResultadoAtaque(resultadoAtaque.rolagem, resultadoAtaque.total, acertou, critico, dano);
    }
}