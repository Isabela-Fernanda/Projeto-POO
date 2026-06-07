import { Inimigo } from "./inimigo.ts";
import { Personagem } from "../personagem.ts";
import { Goblin } from "../../racas/goblin.ts";
import { Inventario } from "../../inventario/inventario.ts";
import { Equipamento } from "../../inventario/equipamento.ts";
import { Atributos } from "../atributos/atributos.ts";
import { CalculadoraDano } from "../../combate/calcularDano.ts";

export class GoblinGuerreiro extends Inimigo {

    constructor() {
        super(
            "Goblin Guerreiro",
            1,
            new Goblin(), // temporário
            new Atributos(
                3,
                2,
                2,
                1,
                1,
                1
            ),
            1,
            15,
            0,
            new Inventario(),
            new Equipamento(),
            new Map(),
            []
        );
    }

    atacar(alvo?: Personagem): void {
        if (!alvo) {
            return;
        }
        const dano =
            CalculadoraDano.calcularAtaqueFisico(
                this,
                alvo
            );

        alvo.receberDano(dano);

        console.log(
            `${this.getNome()} atacou e causou ${dano} de dano!`
        );
    }

}