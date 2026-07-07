import { Personagem } from "../../../personagens/personagem.js";

import { Magia, CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";
import { TipoDano } from "../../../combate/tipoDano.js";

import { Condicao } from "../../../combate/tipoCondicao.js";
import { UtilitarioCondicao, UtilitarioResistencia } from "../utilitarios.js";

export class MagiaRaioDoEnfraquecimento extends Magia {
    constructor() {
        super("Raio do Enfraquecimento", "Você dispara um raio púrpura que drena as forças do alvo. Se falhar na resistência, o alvo fica fatigado. Se passar, fica vulnerável.", 1, "Enfraquece o corpo do alvo.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.NECROMANCIA, TipoAcao.PADRAO, TipoAlvo.INIMIGO, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if(!alvo) return;

        const sucesso = UtilitarioResistencia.testar(alvo, TipoDano.ESSENCIA, usuario.getCDMagia());

        if(sucesso){
            UtilitarioCondicao.aplicar(alvo, Condicao.VULNERAVEL, 10);
        } else {
            UtilitarioCondicao.aplicar(alvo, Condicao.FASCINADO, 10);
        }
    }
}