import { Personagem } from "../../../personagens/personagem.js";
import { Dado } from "../../../combate/dado.js";

import { Magia,CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.js";
import { UtilitarioMagia, UtilitarioResistencia, UtilitarioCondicao } from "../utilitarios.js";

import { TipoDano } from "../../../combate/tipoDano.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";

import { Condicao } from "../../../combate/tipoCondicao.js";

export class MagiaAdagaMental extends Magia {
    constructor() {
        super("Adaga Mental", "Você manifesta e dispara uma adaga imaterial contra a mente do alvo, que sofre 2-12 pontos de dano mental e fica pasmo por uma rodada. Se passar no teste de resistência, sofre apenas metade do dano e não fica pasmo.", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ENCANTAMENTO, TipoAcao.PADRAO, TipoAlvo.INIMIGO, AlcanceMagia.CURTO, DuracaoMagia.INSTANTANEA)
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if (!alvo) {
            return;
        }
        const dano = Dado.rolarVarios(2, 6);

        const passou = UtilitarioResistencia.testar(alvo, TipoDano.MENTAL, usuario.getCDMagia());

        if(passou){
            UtilitarioMagia.causarDano(alvo, Math.floor(dano/2), TipoDano.MENTAL);
        } else {
            UtilitarioMagia.causarDano(alvo, dano, TipoDano.MENTAL);
        }

        UtilitarioCondicao.aplicar(alvo, Condicao.PASMO, 2);
    }
}