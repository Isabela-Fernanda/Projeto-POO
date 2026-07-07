import { Personagem } from "../../../personagens/personagem.js";

import { Magia, CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";
import { TipoDano } from "../../../combate/tipoDano.js";

import { Condicao } from "../../../combate/tipoCondicao.js";
import { UtilitarioCondicao, UtilitarioResistencia } from "../utilitarios.js";

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