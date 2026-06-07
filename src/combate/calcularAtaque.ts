import { Dado } from "./dado.ts";
import { Personagem } from "../personagens/personagem.ts";

export class CalculadoraAtaque {

    static acertou(
        atacante: Personagem,
        alvo: Personagem
    ): boolean {

        const rolagem =
            Dado.d20();

        const total =
            rolagem +
            atacante.getAtributos()
                     .getDestreza();

        console.log(
            `${atacante.getNome()} rolou ${rolagem} (total ${total})`
        );

        return total >= alvo.getDefesa();

    }

}