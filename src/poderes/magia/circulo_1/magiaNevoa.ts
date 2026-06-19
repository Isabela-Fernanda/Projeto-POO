import { Personagem } from "../../../personagens/personagem.ts";

import { MagiaArea } from "../magiaArea.ts";
import { EfeitoArea } from "../../efeitoArea.ts";
import { CirculoMagia, TipoMagia, EscolaMagia, AlcanceMagia, DuracaoMagia } from "../magia.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";

import { AreaCircular } from "../utilitarios.ts";
import { Condicao } from "../../../combate/tipoCondicao.ts";
import { EfeitoCondicao } from "../../efeitos/efeitoCondicao.ts";
import { EfeitoNevoa } from "../../efeitos/efeitoArea/efeitoNevoa.ts";

export class MagiaNevoa extends MagiaArea {
    constructor() {
        super("Névoa", "Uma névoa espessa eleva-se de um ponto a sua escolha, obscurecendo toda a visão — criaturas a até 1,5m têm camuflagem e criaturas a partir de 3m têm camuflagem total. Um vento forte dispersa a névoa em 4 rodadas e um vendaval a dispersa em 1 rodada. Esta magia não funciona sob a água.", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.CONVOCACAO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }

    protected obterArea(): AreaCircular {
        return new AreaCircular(6);
    }

    protected afetarAlvo(usuario: Personagem, alvo: Personagem): void {
        //Não faz nada
    }

    protected override criarEfeitoArea(x: number, y: number, cd: number): EfeitoArea | null {
        return new EfeitoNevoa(x, y, 6, 10, cd)
    }
}