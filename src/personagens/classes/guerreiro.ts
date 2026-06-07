import { CalculadoraDano } from "../../combate/calcularDano.ts";
import { CalculadoraAtaque } from "../../combate/calcularAtaque.ts";
import { Personagem } from "../personagem.ts";
import { Jogador } from "../jogador.ts";

export class Guerreiro extends Jogador {
    atacar(alvo?: Personagem): void {
        if (!alvo) {
            console.log(
                `${this.getNome()} não tem alvo para atacar.`
            );
            return;
        }

        if (
            CalculadoraAtaque.acertou(
                this,
                alvo
            )
        ) {

            const dano =
                CalculadoraDano.calcularAtaqueFisico(
                    this,
                    alvo
                );

            alvo.receberDano(dano);

            console.log(
                `${this.getNome()} causou ${dano} de dano!`
            );

        }
        else {

            console.log(
                `${this.getNome()} errou o ataque!`
            );

        }
    }
}