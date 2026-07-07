import { Time } from "../personagens/time.js";
import { Monstro } from "../personagens/tiposPersonagem/monstro.js";
import { DadosMonstro } from "../personagens/tiposPersonagem/catalogoMonstros.js";

import { Monstruosa } from "../personagens/racas/monstruosa.js";

import { Inventario } from "../inventario/inventario.js";
import { Equipamento } from "../inventario/equipamento.js";

import { GrauTreinamento } from "../pericias/pericia.js";
import { Loot } from "../personagens/loot.js";

export class FabricaMonstros {
    static criar(dados: DadosMonstro, loot: Loot[] = []): Monstro {
        const monstro = new Monstro(
            dados.nome,
            dados.nivel,
            Time.INIMIGOS,
            new Monstruosa(),
            null,
            dados.atributos,
            new Inventario(),
            new Equipamento(),
            new Map(),
            new Map(),
            dados.habilidades ?? [],
            dados.xp,
            loot,
            dados.tamanho,
            false,
            dados.comportamento,
        );

        monstro.setVidaMaxima(dados.vida);
        monstro.setDeslocamento(dados.deslocamento);

        for (const pericia of dados.pericias) {
            monstro.adicionarPericia(
                pericia.pericia,
                GrauTreinamento.TREINADO
            );

            monstro.adicionarBonusPericia(
                pericia.pericia,
                pericia.bonus
            );
        }

        if (dados.armaNatural) {
            monstro.equiparArmaNatural(
                dados.armaNatural
            );
        }

        if (dados.armaPrincipal) {
            monstro.getEquipamento().equiparMaoDireita(
                dados.armaPrincipal
            );
        }

        if (dados.armaSecundaria) {
            monstro.getEquipamento().equiparMaoEsquerda(
                dados.armaSecundaria
            );
        }

        if (dados.armadura) {
            monstro.equiparProtecao(
                dados.armadura
            );
        }

        return monstro;
    }
}