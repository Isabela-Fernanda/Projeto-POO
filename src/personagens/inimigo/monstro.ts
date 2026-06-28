import { Personagem } from "../personagem.ts";
import { Inimigo } from "./inimigo.ts";
import { Mapa } from "../../mapa/mapa.ts";

import { Time } from "../time.ts";
import { Raca } from "../racas/raca.ts";
import { Classe } from "../classes/classe.ts";
import { Atributos } from "../atributos/atributos.ts";
import { Equipamento } from "../../inventario/equipamento.ts";
import { Inventario } from "../../inventario/inventario.ts";
import { Pericia, GrauTreinamento } from "../../pericias/pericia.ts";
import { Habilidade } from "../../poderes/habilidades.ts";
import { AtaquePossivel, ModoAtaque } from "../../combate/testes/testeAtaque.ts";

import { Arma } from "../../itens/arma.ts";
import { ComportamentoIA } from "../../combate/IA.ts";
import { Tamanho } from "./catalogoMonstros.ts";
import { EstadoTurno } from "../../combate/estadoTurno.ts";
import { Loot } from "./loot.ts";

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