import { Personagem } from "./personagem.ts";
import { Time } from "./time.ts";
import { Raca } from "../racas/raca.ts";
import { Classe } from "./classes/classe.ts";
import { Atributos } from "./atributos/atributos.ts";
import { Inventario } from "../inventario/inventario.ts";
import { Equipamento } from "../inventario/equipamento.ts";
import { Pericia } from "../pericias/pericia.ts";
import { GrauTreinamento } from "../pericias/grauTreinamento.ts";
import { Habilidade } from "../poderes/habilidades.ts";
import { Combate } from "../combate/combate.ts"

import { AtaquePossivel, ModoAtaque, TesteAtaque } from "../combate/testes/testeAtaque.ts";
import { Mapa } from "../mapa/mapa.ts";
import { Arma } from "../inventario/itens/arma.ts";

export class Jogador extends Personagem {
    protected experiencia: number = 0;
    protected ouro: number = 0;

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
        super(nome, nivel, Time.HEROIS, raca, classe, atributos, inventario, equipamento, pericias, bonusPericias, habilidades);
        this.experiencia = 0;
        this.ouro = 0;
    }

    ganharExperiencia(valor: number) {
        this.experiencia += valor;

        while (this.experiencia >= this.getNivel() * 100) {
            this.experiencia -= this.getNivel() * 100;
            this.nivel++;

            console.log(`${this.getNome()} subiu para o nível ${this.nivel}!`)
        }
    }
    atacar(alvo: Personagem, mapa: Mapa, arma: Arma, modoAtaque: ModoAtaque): void {
        this.resolverAtaque(alvo, arma, modoAtaque);
    }

    atacarComDuasArmas(alvo: Personagem, mapa: Mapa, ataques: AtaquePossivel[]): void {
        for (const ataque of ataques) {
            this.resolverAtaque(alvo, ataque.arma, ataque.modoAtaque, this.getPenalidadeDuasArmas());
        }
    }
}
