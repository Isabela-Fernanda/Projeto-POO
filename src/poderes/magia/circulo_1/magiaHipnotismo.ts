import { Personagem } from "../../../personagens/personagem.js";

import { Magia, CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";
import { TipoDano } from "../../../combate/tipoDano.js";

import { UtilitarioCondicao,UtilitarioResistencia } from "../utilitarios.js";

import { Condicao } from "../../../combate/tipoCondicao.js";

export class MagiaHipnotismo extends Magia {
    constructor() {
        super("Hipnotismo", "Suas palavras e movimentos ritmados deixam as criaturas fascinadas. Esta magia só afeta criaturas que possam perceber você. Se usar esta magia em combate, os alvos recebem +5 em seus testes de resistência.", 1, "Fascina criaturas com gestos hipnóticos.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ENCANTAMENTO, TipoAcao.PADRAO, TipoAlvo.CRIATURA, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if(!alvo) return;
        const sucesso = UtilitarioResistencia.testar(alvo, TipoDano.MENTAL, usuario.getCDMagia());

        if(!sucesso){
            UtilitarioCondicao.aplicar(alvo, Condicao.FATIGADO, 6);
        }
    }
}