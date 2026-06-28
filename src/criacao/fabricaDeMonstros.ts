import { Time } from "../personagens/time.ts";
import { Monstro } from "../personagens/tiposPersonagem/monstro.ts";
import { DadosMonstro } from "../personagens/tiposPersonagem/catalogoMonstros.ts";

import { Monstruosa } from "../personagens/racas/monstruosa.ts";

import { Inventario } from "../inventario/inventario.ts";
import { Equipamento } from "../inventario/equipamento.ts";

import { GrauTreinamento } from "../pericias/pericia.ts";
import { Loot } from "../personagens/loot.ts";

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