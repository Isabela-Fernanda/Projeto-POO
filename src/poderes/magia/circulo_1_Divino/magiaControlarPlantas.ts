import { Personagem } from "../../../personagens/personagem.ts";

import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { TipoDano } from "../../../combate/tipoDano.ts";

import { MagiaArea } from "../magiaArea.ts";
import { CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia, } from "../magia.ts";

import { Condicao } from "../../../combate/tipoCondicao.ts";
import { UtilitarioCondicao, UtilitarioResistencia, AreaMagica, AreaCircular, FiltroInimigos } from "../utilitarios.ts";

export class MagiaControlarPlantas extends MagiaArea {
    constructor() {
        super("Controlar Plantas", "...", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.DIVINA, EscolaMagia.TRANSMUTACAO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }
    protected obterArea(): AreaMagica {
        return new AreaCircular(9);
    }

    protected afetarAlvo(usuario: Personagem, alvo: Personagem): void {
        const sucesso = UtilitarioResistencia.testar(alvo, TipoDano.RESTRICAO, usuario.getCDMagia());

        if (!sucesso) {
            UtilitarioCondicao.aplicar(alvo, "Enredado", Condicao.ENREDADO, 3);
            console.log(`${alvo.getNome()} ficou enredado.`);
        }
    }

    override usarEmArea(usuario: Personagem, criaturas: Personagem[]): void {
        const area = this.obterArea();
        const criaturasArea = area.obterAlvos(usuario.getX(), usuario.getY(), usuario, criaturas);

        const alvos = FiltroInimigos.aplicar(usuario, criaturasArea);

        for (const alvo of alvos) {
            this.afetarAlvo(usuario, alvo);
        }
    }
}