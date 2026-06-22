import { Time } from "../personagens/time.ts";
import { Monstro } from "../personagens/inimigo/monstro.ts";
import { DadosMonstro } from "../personagens/inimigo/catalogoMonstros.ts";

import { Monstruosa } from "../racas/monstruosa.ts";

import { Inventario } from "../inventario/inventario.ts";
import { Equipamento } from "../inventario/equipamento.ts";
import { Arma } from "../inventario/itens/arma.ts";
import { Armadura } from "../inventario/itens/armadura.ts";

import { Pericia } from "../pericias/pericia.ts";
import { GrauTreinamento } from "../pericias/grauTreinamento.ts";

export class FabricaMonstros {
    static criar(dados: DadosMonstro): Monstro {
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
            dados.tamanho,
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
            monstro.equiparMaoDireita(
                dados.armaPrincipal
            );
        }

        if (dados.armaSecundaria) {
            monstro.equiparMaoEsquerda(
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