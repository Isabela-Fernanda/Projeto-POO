import { Personagem } from "../personagem.ts";
import { Mapa } from "../../mapa/mapa.ts";

import { Time } from "../time.ts";
import { Raca } from "../racas/raca.ts";
import { Classe } from "../classes/depois/classe.ts";
import { Atributos } from "../atributos/atributos.ts";
import { Equipamento } from "../../inventario/equipamento.ts";
import { Inventario } from "../../inventario/inventario.ts";
import { Pericia, GrauTreinamento } from "../../pericias/pericia.ts";
import { Habilidade } from "../../poderes/habilidades.ts";
import { EstadoTurno } from "../../combate/estadoTurno.ts";
import { Loot } from "../loot.ts";

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