import { Personagem } from "../../../personagens/personagem.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, Magia, TipoMagia } from "../magia.ts";

import { EfeitoDisfarceIlusorio } from "../../efeitos/efeitoDisfarceIlusorio.ts";

export class MagiaDisfarceIlusorio extends Magia {
    constructor() {
        super("Disfarca Ilusório", "Você muda a aparência do alvo, incluindo seu equipamento. Isso inclui altura, peso, tom de pele, cor de cabelo, timbre de voz etc. O alvo recebe +10 em testes de Enganação para disfarce. O alvo não recebe novas habilidades (você pode ficar parecido com outra raça, mas não ganhará as habilidades dela), nem modifica o equipamento (uma espada longa disfarçada de bordão continua funcionando e causando dano como uma espada).", 1, "Altera magicamente sua aparência.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ILUSAO, TipoAcao.PADRAO, TipoAlvo.PROPRIO, AlcanceMagia.PESSOAL, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        usuario.adicionarEfeito(new EfeitoDisfarceIlusorio());

        //Se adicionar personagens 2d depois, deixar apaarencia randomica ou por termos gerais
    }
}