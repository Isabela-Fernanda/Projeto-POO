import { Personagem } from "../../../personagens/personagem.ts";
import { Dado } from "../../../combate/dado.ts";

import { Magia, CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { TipoDano } from "../../../combate/tipoDano.ts";

import { UtilitarioCondicao, UtilitarioResistencia } from "../utilitarios.ts";

import { Condicao } from "../../../combate/tipoCondicao.ts";

export class MagiaAmedrontar extends Magia {
    constructor() {
        super("Amedrontar", "O alvo é envolvido por energias sombrias assustadoras. Se falhar na resistência, fica apavorado por 1-4 rodadas, depois abalado. Se passar, fica abalado por 1d4 rodadas.", 1, "Assusta o alvo com energias sombrias.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.NECROMANCIA, TipoAcao.PADRAO, TipoAlvo.INIMIGO, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) {
            return;
        }
        const sucesso = UtilitarioResistencia.testar(alvo, TipoDano.MENTAL, usuario.getCDMagia())

        if (sucesso) {
            UtilitarioCondicao.aplicar(alvo, Condicao.ABALADO, Dado.d4());
        } else {
            UtilitarioCondicao.aplicar(alvo, Condicao.ABALADO, Dado.d4());
            UtilitarioCondicao.aplicar(alvo, Condicao.APAVORADO, Dado.d4());
        }
    }
}