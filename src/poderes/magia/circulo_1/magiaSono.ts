import { Personagem } from "../../../personagens/personagem.ts";

import { Magia, CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { TipoDano } from "../../../combate/tipoDano.ts";

import { Condicao } from "../../../combate/tipoCondicao.ts";
import { UtilitarioCondicao, UtilitarioResistencia } from "../utilitarios.ts";

export class MagiaSono extends Magia {
    constructor() {
        super("Sono", "Um sono místico recai sobre o alvo. Se passar na resistência, fica fatigado por uma rodada. Se falhar, fica inconsciente e caído. ", 1, "Induz um sono mágico profundo.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ENCANTAMENTO, TipoAcao.PADRAO, TipoAlvo.INIMIGO, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) return;

        const sucesso = UtilitarioResistencia.testar(alvo, TipoDano.MENTAL, usuario.getCDMagia());

        if (sucesso) {
            UtilitarioCondicao.aplicar(alvo, Condicao.VULNERAVEL, 1);
        } else {
            UtilitarioCondicao.aplicar(alvo, Condicao.INCONSCIENTE, 10);
            UtilitarioCondicao.aplicar(alvo, Condicao.CAIDO, 10);
        }
    }
}