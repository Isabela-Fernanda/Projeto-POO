import { Personagem } from "../../../personagens/personagem.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, Magia, TipoMagia } from "../magia.ts";

import { EfeitoVitalidadeFantasma } from "../../efeitos/efeitoVitalidadeFantasma.ts";
import { Dado } from "../../../combate/dado.ts";


export class MagiaVitalidadeFantasma extends Magia {
    constructor() {
        super("Vitalidade Fantasma", "Você suga energia vital da terra, recebendo 2d8 pontos de vida temporários. Os PV temporários desaparecem ao final da cena. ", 1, "Concede pontos de vida temporários.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.NECROMANCIA, TipoAcao.PADRAO, TipoAlvo.PROPRIO, AlcanceMagia.PESSOAL, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        const PV = Dado.rolarVarios(2, 8);
        usuario.adicionarEfeito(new EfeitoVitalidadeFantasma(PV));
    }
}