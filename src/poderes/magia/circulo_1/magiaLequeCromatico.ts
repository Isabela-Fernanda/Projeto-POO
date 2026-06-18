import { Personagem } from "../../../personagens/personagem.ts";

import { Magia, CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { TipoDano } from "../../../combate/tipoDano.ts";

import { EfeitoCondicao } from "../../efeitos/efeitoCondicao.ts";
import { Condicao } from "../../../combate/tipoCondicao.ts";
import { UtilitarioCondicao, UtilitarioResistencia } from "../utilitarios.ts";

export class MagiaLequeCromatico extends Magia {
    constructor() {
        super("Leque Cromático", "Um cone de luzes brilhantes surge a partir das suas mãos, deixando as criaturas na área atordoadas por 1 rodada e ofuscadas pela cena. Caso passem na resistência, não ficam atordoadas. Esta magia afeta apenas criaturas de ND 2 ou menor e não afeta criaturas cegas.", 1, "Explosão de luzes que confunde inimigos.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ILUSAO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.MEDIO, DuracaoMagia.INSTANTANEA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        if(!alvo) return;

        const sucesso = UtilitarioResistencia.testar(alvo, TipoDano.LUZ, usuario.getCDMagia());

        if(sucesso){
            UtilitarioCondicao.aplicar(alvo, "Ofuscado", Condicao.OFUSCADO, 10);
        } else {
            UtilitarioCondicao.aplicar(alvo, "Atordoado", Condicao.ATORDOADO, 1);
            UtilitarioCondicao.aplicar(alvo, "Ofuscado", Condicao.OFUSCADO, 10);
        }
    }
}