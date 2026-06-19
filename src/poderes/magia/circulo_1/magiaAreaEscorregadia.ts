import { Personagem } from "../../../personagens/personagem.ts";

import { MagiaArea } from "../magiaArea.ts";
import { EfeitoArea } from "../../efeitoArea.ts";
import { CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { TipoDano } from "../../../combate/tipoDano.ts";

import { AreaCircular, UtilitarioResistencia, UtilitarioCondicao } from "../utilitarios.ts";
import { Condicao } from "../../../combate/tipoCondicao.ts";
import { EfeitoNevoa } from "../../efeitos/efeitoArea/efeitoNevoa.ts";
import { EfeitoAreaEscorregadia } from "../../efeitos/efeitoArea/efeitoAreaEscorregadia.ts";

export class MagiaAreaEscorregadia extends MagiaArea {
    constructor() {
        super("Área Escorregadia", "Esta magia recobre uma superfície com uma substância gordurosa e escorregadia. Criaturas na área devem passar na resistência para não cair. Nas rodadas seguintes, criaturas que tentem movimentar-se pela área devem fazer testes de Acrobacia para equilíbrio (CD 10).\nÁrea Escorregadia pode tornar um item escorregadio. Uma criatura segurando um objeto afetado deve passar na resistência para não deixar o item cair cada vez que usá-lo. ", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.CONVOCACAO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }
    protected obterArea(): AreaCircular {
        return new AreaCircular(6);
    }

    protected afetarAlvo(usuario: Personagem, alvo: Personagem): void {
        const sucesso = UtilitarioResistencia.testar(alvo, TipoDano.EQUILIBRIO, usuario.getCDMagia());

        if (!sucesso) {
            UtilitarioCondicao.aplicar(alvo, "Desequilibrado", Condicao.DESEQUILIBRADO, 1);
        }

    }

    protected override criarEfeitoArea(x: number, y: number, cd: number): EfeitoArea | null {
        return new EfeitoAreaEscorregadia(x, y, 6, 10, cd)
    }


}