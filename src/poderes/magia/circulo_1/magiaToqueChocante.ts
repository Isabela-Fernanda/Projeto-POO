import { Personagem } from "../../../personagens/personagem.ts";
import { CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia, Magia } from "../magia.ts";

import { TipoDano } from "../../../combate/tipoDano.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { UtilitarioMagia } from "../utilitarios.ts";
import { Dado } from "../../../combate/dado.ts";

export class MagiaToqueChocante extends Magia {
    constructor() {
        super("Toque Chocante", "Arcos elétricos envolvem sua mão, causando 2d8+2 pontos de dano de eletricidade. Se o alvo usa armadura de metal (ou carrega muito metal, a critério do mestre), sofre uma penalidade de –5 no teste de resistência. ", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.EVOCACAO, TipoAcao.PADRAO, TipoAlvo.INIMIGO, AlcanceMagia.TOQUE, DuracaoMagia.INSTANTANEA)
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if(!alvo)return;
        const dano = Dado.rolarVarios(2, 8) + 2;
        UtilitarioMagia.causarDano(alvo, dano, TipoDano.ELETRICIDADE);
    }
}