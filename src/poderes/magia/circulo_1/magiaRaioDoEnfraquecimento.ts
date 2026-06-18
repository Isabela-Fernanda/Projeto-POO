import { Personagem } from "../../../personagens/personagem.ts";

import { Magia, CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { TipoDano } from "../../../combate/tipoDano.ts";

import { Condicao } from "../../../combate/tipoCondicao.ts";
import { UtilitarioCondicao, UtilitarioResistencia } from "../utilitarios.ts";

export class MagiaRaioDoEnfraquecimento extends Magia {
    constructor() {
        super("Raio do Enfraquecimento", "Você dispara um raio púrpura que drena as forças do alvo. Se falhar na resistência, o alvo fica fatigado. Se passar, fica vulnerável.", 1, "Enfraquece o corpo do alvo.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.NECROMANCIA, TipoAcao.PADRAO, TipoAlvo.INIMIGO, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if(!alvo) return;

        const sucesso = UtilitarioResistencia.testar(alvo, TipoDano.ESSENCIA, usuario.getCDMagia());

        if(sucesso){
            UtilitarioCondicao.aplicar(alvo, "Vulnerável", Condicao.VULNERAVEL, 10);
        } else {
            UtilitarioCondicao.aplicar(alvo, "Fatigado", Condicao.FASCINADO, 10);
        }
    }
}