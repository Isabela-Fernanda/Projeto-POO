import { Pericia } from "./pericia";
import { GrauTreinamento } from "./grauTreinamento";
import { Personagem } from "../personagens/personagem";

export class CalculadoraPericia {
    static calcular(personagem: Personagem, pericia: Pericia): number {
        const atributo = personagem.getAtributo(pericia.getAtributoBase());

        const treinamento = personagem.getGrauTreinamento(pericia);

        const bonus = personagem.getBonusPericia(pericia);

        if(pericia.exigeTreinamento() && treinamento === GrauTreinamento.DESTREINADO) {
            throw new Error(`${pericia.getNome()} exige treinamento.`)
        }

        return atributo + treinamento + bonus;
    }
}