import { Pericia } from "./pericia";
import { GrauTreinamento } from "./grauTreinamento";
import { Personagem } from "../personagens/personagem";

export class CalculadoraPericia {
    static calcular(personagem: Personagem, pericia: Pericia): number {
        const atributo = personagem.getModificadorAtributo(pericia.getAtributoBase());

        const treinamento = personagem.getPericias().get(pericia);

        if(pericia.exigeTreinamento() && treinamento === undefined) {
            throw new Error(`${pericia.getNome()} exige treinamento.`)
        }

        return atributo + (treinamento ?? GrauTreinamento.DESTREINADO);
    }
}