import { Pericia, GrauTreinamento } from "../../pericias/pericia.ts";

import { Personagem } from "../../personagens/personagem.ts";


export class CalculadoraPericia {
    static calcular(personagem: Personagem, pericia: Pericia): number {
        const atributo = personagem.getModificadorAtributo(pericia.getAtributoBase());

        const treinamento = personagem.getGrauTreinamento(pericia);
        const bonus = personagem.getBonusPericia(pericia);

        if (pericia.exigeTreinamento() && treinamento === GrauTreinamento.DESTREINADO) {
            throw new Error(`${pericia.getNome()} exige treinamento.`);
        }

        const bonusEfeitos = personagem.somarBonusEfeitos(e => e.getBonusPericia());

        return atributo + treinamento + bonus + bonusEfeitos;
    }
}