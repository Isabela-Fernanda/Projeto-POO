import { Personagem } from "../../../personagens/personagem.js";
import { Dado } from "../../../combate/dado.js";

import { Magia, CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";
import { TipoDano } from "../../../combate/tipoDano.js";

import { UtilitarioCondicao, UtilitarioResistencia } from "../utilitarios.js";

import { Condicao } from "../../../combate/tipoCondicao.js";

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