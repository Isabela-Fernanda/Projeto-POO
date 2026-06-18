import { Personagem } from "./personagem.ts";
import { Time } from "./time.ts";
import { Dado } from "../combate/dado.ts";

import { Inventario } from "../inventario/inventario.ts";
import { Equipamento } from "../inventario/equipamento.ts";
import { Atributos } from "./atributos/atributos.ts";

import { TipoDano } from "../combate/tipoDano.ts";
import { UtilitarioMagia } from "../poderes/magia/utilitarios";

export class MonstroInvocado extends Personagem {
    constructor(
        nivelConjurador: number,
        time: Time,
        private tipoDano: TipoDano
    ) {
        super("Monstro Invocado", nivelConjurador, time, new RacaInvocacao(), null, new Atributos(2, 3, 0, 0, 0, 0), new Inventario(), new Equipamento(), new Map(), new Map(), []);

        this.vidaAtual = 20;
        this.vidaMaxima = 20;
        this.setDeslocamento(9);
    }

    atacar(alvo?: Personagem): void {
        if (!alvo) return;

        const dano = Dado.rolarVarios(2, 4) + 2;

        UtilitarioMagia.causarDano(
            alvo,
            dano,
            this.tipoDano
        );
    }

    override getDefesa(): number {
        return 0;
    }
}