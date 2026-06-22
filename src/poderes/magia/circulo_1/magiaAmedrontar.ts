import { Personagem } from "../../../personagens/personagem.ts";
import { Dado } from "../../../combate/dado.ts";

import { Magia, CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { TipoDano } from "../../../combate/tipoDano.ts";

import { UtilitarioResistencia } from "../utilitarios.ts";

import { EfeitoCondicao } from "../../efeitos/efeitoCondicao.ts";
import { Condicao } from "../../../combate/tipoCondicao.ts";

export class MagiaAmedrontar extends Magia {
    constructor() {
        super("Amedrontar", "O alvo é envolvido por energias sombrias assustadoras. Se falhar na resistência, fica apavorado por 1d4 rodadas, depois abalado. Se passar, fica abalado por 1d4 rodadas.", 1, "Assusta o alvo com energias sombrias.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.NECROMANCIA, TipoAcao.PADRAO, TipoAlvo.INIMIGO, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) {
            return;
        }
        const sucesso = UtilitarioResistencia.testar(alvo, TipoDano.MENTAL, usuario.getCDMagia())

        if (sucesso) {
            alvo.adicionarEfeito(new EfeitoCondicao("Abalado", Dado.d4(), Condicao.ABALADO));
        } else {
            const rodadas = Dado.rolar(4);
            alvo.adicionarEfeito(new EfeitoCondicao("Apavorado", rodadas, Condicao.APAVORADO));
            alvo.adicionarEfeito(new EfeitoCondicao("Abalado", 99, Condicao.ABALADO));
        }
    }
}