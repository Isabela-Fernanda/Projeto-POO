import { Personagem } from "../../../personagens/personagem.js";
import { CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia, Magia } from "../magia.js";

import { TipoDano } from "../../../combate/tipoDano.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";
import { UtilitarioMagia } from "../utilitarios.js";
import { Dado } from "../../../combate/dado.js";

export class MagiaToqueChocante extends Magia {
    constructor() {
        super("Toque Chocante", "Arcos elétricos envolvem sua mão, causando 4-18 pontos de dano de eletricidade. Se o alvo usa armadura de metal (ou carrega muito metal, a critério do mestre), sofre uma penalidade de –5 no teste de resistência. ", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.EVOCACAO, TipoAcao.PADRAO, TipoAlvo.INIMIGO, AlcanceMagia.TOQUE, DuracaoMagia.INSTANTANEA)
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if(!alvo)return;
        const dano = Dado.rolarVarios(2, 8) + 2;
        UtilitarioMagia.causarDano(alvo, dano, TipoDano.ELETRICIDADE);
    }
}