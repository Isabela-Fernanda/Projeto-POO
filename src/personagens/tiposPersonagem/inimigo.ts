import { Personagem } from "../personagem.js";
import { Mapa } from "@mapa/mapa.js";

import { Time } from "../time.js";
import { Raca } from "../racas/raca.js";
import { Classe } from "../classes/classe.js";
import { Atributos } from "../atributos/atributos.js";
import { Equipamento } from "@inventario/equipamento.js";
import { Inventario } from "@inventario/inventario.js";
import { Pericia, GrauTreinamento } from "@pericias/pericia.js";
import { Habilidade } from "@poderes/habilidades.js";
import { EstadoTurno } from "@combate/estadoTurno.js";
import { Loot } from "../loot.js";

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
        xpConcedido: number,
        loot: Loot[],
    ) {
        super(nome, nivel, time, raca, classe, atributos, inventario, equipamento, pericias, bonusPericias, habilidades, xpConcedido, loot);
    }
    abstract executarTurno(alvos: Personagem[], mapa: Mapa, estado: EstadoTurno): void;
}