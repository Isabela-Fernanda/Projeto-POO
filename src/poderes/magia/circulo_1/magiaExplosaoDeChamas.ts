import { Personagem } from "../../../personagens/personagem.ts";
import { Dado } from "../../../combate/dado.ts";
import { CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.ts";

import { AreaCircular, AreaMagica, FiltroInimigos, UtilitarioMagia } from "../utilitarios.ts";

import { TipoDano } from "../../../combate/tipoDano.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { MagiaArea } from "../magiaArea.ts";

export class MagiaExplosaoDeChamas extends MagiaArea {
    constructor() {
        super("Explosão de Chamas", "Um leque de chamas irrompe de suas mãos, causando 2d6 pontos de dano de fogo às criaturas na área.", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.EVOCACAO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.CURTO, DuracaoMagia.INSTANTANEA);
    }

    protected obterArea(): AreaMagica {
        return new AreaCircular(6);
    }

    protected afetarAlvo(usuario: Personagem, alvo: Personagem): void {
        const dano = Dado.rolarVarios(2, 6);

        UtilitarioMagia.causarDano(alvo, dano, TipoDano.FOGO);
    }

    override usarEmArea(usuario: Personagem, criaturas: Personagem[]): void {
        const criaturasArea = this.obterArea().obterAlvos(usuario.getX(), usuario.getY(), usuario, criaturas);

        const alvos = FiltroInimigos.aplicar(usuario, criaturasArea);

        for (const alvo of alvos) {
            this.afetarAlvo(usuario, alvo);
        }
    }
}