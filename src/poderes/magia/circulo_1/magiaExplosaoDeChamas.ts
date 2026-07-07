import { Personagem } from "../../../personagens/personagem.js";
import { Dado } from "../../../combate/dado.js";

import { MagiaArea } from "../magiaArea.js";
import { CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";
import { TipoDano } from "../../../combate/tipoDano.js";

import { AreaCircular, UtilitarioMagia, FiltroInimigos, UtilitarioCondicao } from "../utilitarios.js";
import { Condicao } from "../../../combate/tipoCondicao.js";

export class MagiaExplosaoDeChamas extends MagiaArea {
    constructor() {
        super("Explosão de Chamas", "Um leque de chamas irrompe de suas mãos, causando 2-12 pontos de dano de fogo às criaturas na área.", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.EVOCACAO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.CURTO, DuracaoMagia.INSTANTANEA);
    }

    protected obterArea(): AreaCircular {
        return new AreaCircular(6);
    }

    protected afetarAlvo(usuario: Personagem, alvo: Personagem): void {
        const dano = Dado.rolarVarios(2, 6);

        UtilitarioMagia.causarDano(alvo, dano, TipoDano.FOGO);
        UtilitarioCondicao.aplicar(alvo, Condicao.QUEIMANDO, 1);
    }

    override usarEmArea(usuario: Personagem, criaturas: Personagem[]): void {
        const criaturasArea = this.obterArea().obterAlvos(usuario.getX(), usuario.getY(), usuario, criaturas);

        const alvos = FiltroInimigos.aplicar(usuario, criaturasArea);

        for (const alvo of alvos) {
            this.afetarAlvo(usuario, alvo);
        }
    }
}