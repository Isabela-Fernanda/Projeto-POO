import { Personagem } from "../personagem.ts";
import { Mapa } from "../../mapa/mapa.ts";

import { Time } from "../time.ts";
import { Raca } from "../racas/raca.ts";
import { Classe } from "../classes/classe.ts";
import { Atributos } from "../atributos/atributos.ts";
import { Equipamento } from "../../inventario/equipamento.ts";
import { Inventario } from "../../inventario/inventario.ts";
import { Pericia, GrauTreinamento } from "../../pericias/pericia.ts";
import { Habilidade } from "../../poderes/habilidades.ts";
import { EstadoTurno } from "../../combate/estadoTurno.ts";
import { Loot, Random } from "./loot.ts";
import { Item } from "../../itens/item.ts";

export abstract class Inimigo extends Personagem {
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

        private xpConcedido: number,
        private loot: Loot[],
    ) {
        super(nome, nivel, time, raca, classe, atributos, inventario, equipamento, pericias, bonusPericias, habilidades);
    }
    abstract executarTurno(alvos: Personagem[], mapa: Mapa, estado: EstadoTurno): void;

    getXP(): number {
        return this.xpConcedido;
    }

    getLoot(): Loot[] {
        return this.loot;
    }

    adicionarLoot(item: Loot): void {
        this.loot.push(item);
    }

    gerarLoot(): Item[] {
        const itens: Item[] = [];

        for (const loot of this.getLoot()) {
            if (!Random.chance(loot.chance)) {
                continue;
            }

            const quantidade = Random.inteiro(loot.quantidadeMin, loot.quantidadeMax);

            for (let i = 0; i < quantidade; i++) {
                itens.push(loot.item);
            }
        }
        return itens;
    }
}