import { Personagem } from "../personagem.js";
import { Inimigo } from "./inimigo.js";
import { Mapa } from "@mapa/mapa.js";

import { Time } from "../time.js";
import { Raca } from "../racas/raca.js";
import { Classe } from "../classes/classe.js";
import { Atributos } from "../atributos/atributos.js";
import { Equipamento } from "@inventario/equipamento.js";
import { Inventario } from "@inventario/inventario.js";
import { Pericia, GrauTreinamento } from "@pericias/pericia.js";
import { Habilidade } from "@poderes/habilidades.js";
import { AtaquePossivel, ModoAtaque } from "@combate/testes/testeAtaque.js";

import { Arma } from "@itens/arma.js";
import { ComportamentoIA } from "@combate/IA.js";
import { Tamanho } from "./catalogoMonstros.js";
import { EstadoTurno } from "@combate/estadoTurno.js";
import { Loot } from "../loot.js";

export class Monstro extends Inimigo {
    constructor(
        nome: string,
        nivel: number,
        time: Time = Time.INIMIGOS,
        raca: Raca,
        classe: Classe | null,
        atributos: Atributos,
        inventario: Inventario,
        equipamento: Equipamento,
        pericias: Map<Pericia, GrauTreinamento>,
        bonusPericias: Map<Pericia, number> = new Map(),
        habilidades: Habilidade[],
        xpConcedido: number,
        loot: Loot[],

        private tamanho: Tamanho,
        private alerta: boolean = false,
        private comportamento: ComportamentoIA,
    ) {
        super(nome, nivel, time, raca, classe, atributos, inventario, equipamento, pericias, bonusPericias, habilidades, xpConcedido, loot);
    }

    estaEmAlerta(): boolean {
        return this.alerta;
    }

    entrarEmAlerta(): void {
        this.alerta = true;
    }

    sairDoAlerta(): void {
        this.alerta = false;
    }

    executarTurno(participantes: Personagem[], mapa: Mapa, estado: EstadoTurno): void {
        this.comportamento.executar(this, participantes, mapa, estado);
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