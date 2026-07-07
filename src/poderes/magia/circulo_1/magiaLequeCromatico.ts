import { Personagem } from "../../../personagens/personagem.js";

import { Magia, CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";
import { TipoDano } from "../../../combate/tipoDano.js";

import { Condicao } from "../../../combate/tipoCondicao.js";
import { UtilitarioCondicao, UtilitarioResistencia } from "../utilitarios.js";

export class MagiaLequeCromatico extends Magia {
    constructor() {
        super("Leque Cromático", "Um cone de luzes brilhantes surge a partir das suas mãos, deixando as criaturas na área atordoadas por 1 rodada e ofuscadas pela cena. Caso passem na resistência, não ficam atordoadas. Esta magia afeta apenas criaturas de ND 2 ou menor e não afeta criaturas cegas.", 1, "Explosão de luzes que confunde inimigos.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ILUSAO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.MEDIO, DuracaoMagia.INSTANTANEA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if(!alvo) return;

        const sucesso = UtilitarioResistencia.testar(alvo, TipoDano.LUZ, usuario.getCDMagia());

        if(sucesso){
            UtilitarioCondicao.aplicar(alvo, Condicao.OFUSCADO, 10);
        } else {
            UtilitarioCondicao.aplicar(alvo, Condicao.ATORDOADO, 1);
            UtilitarioCondicao.aplicar(alvo, Condicao.OFUSCADO, 10);
        }
    }
}