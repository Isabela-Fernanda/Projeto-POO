import { Personagem } from "../../../personagens/personagem.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, Magia, TipoMagia } from "../magia.ts";

import { EfeitoArmaduraArcana } from "../../efeitos/efeitoArmaduraArcana.ts";

export class MagiaArmaduraArcana extends Magia {
    constructor() {
        super("Armadura Arcana", "Esta magia cria uma película protetora invisível, mas tangível, fornecendo +4 na Defesa. Esse bônus é cumulativo com outras magias, mas não com bônus fornecido por armaduras.", 1, "Cria uma proteção mágica invisível.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ABJURACAO, TipoAcao.PADRAO, TipoAlvo.PROPRIO, AlcanceMagia.PESSOAL, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        usuario.adicionarEfeito(new EfeitoArmaduraArcana());
    }
}