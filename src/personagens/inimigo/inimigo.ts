import { Personagem } from "../personagem.ts";
import { Time } from "../time.ts";
import { Raca } from "../../racas/raca.ts";
import { Classe } from "../classes/classe.ts";
import { Atributos } from "../atributos/atributos.ts";
import { Inventario } from "../../inventario/inventario.ts";
import { Equipamento } from "../../inventario/equipamento.ts";

import { Pericia } from "../../pericias/pericia.ts";
import { GrauTreinamento } from "../../pericias/grauTreinamento.ts";

import { Habilidade } from "../../habilidades/habilidades.ts";

import { TesteAtaque } from "../../combate/testes/testeAtaque.ts";

export class Inimigo extends Personagem {
    constructor(
    nome: string,
    nivel: number,
    raca: Raca,
    classe: Classe | null,
    atributos: Atributos,
    inventario: Inventario,
    equipamento: Equipamento,
    pericias: Map<Pericia, GrauTreinamento>,
    bonusPericias: Map<Pericia, number>,
    habilidades: Habilidade[]
) {
    super(nome, nivel, Time.INIMIGOS, raca, classe, atributos, inventario, equipamento, pericias, bonusPericias, habilidades);
}

    atacar(alvo?: Personagem): void {
        if (!alvo) {
            return;
        }

        const resultado = TesteAtaque.executarAtaque(this, alvo);

        console.log(`${this.getNome()} ataca ${alvo.getNome()}`);

        if(!resultado.acertou) {
            console.log("ERROU!");
            return;
        }

        alvo.receberDano(resultado.dano);

        if (resultado.critico) {
            console.log("ACERTO CRÍTICO!");
        }

        console.log(
            `${alvo.getNome()} sofreu ${resultado.dano} dano`
        );
    }
}