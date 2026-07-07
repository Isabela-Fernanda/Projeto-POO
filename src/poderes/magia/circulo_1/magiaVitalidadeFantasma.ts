import { Personagem } from "../../../personagens/personagem.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, Magia, TipoMagia } from "../magia.js";

import { EfeitoVitalidadeFantasma } from "../../efeitos/efeitoVitalidadeFantasma.js";
import { Dado } from "../../../combate/dado.js";


export class MagiaVitalidadeFantasma extends Magia {
    constructor() {
        super("Vitalidade Fantasma", "Você suga energia vital da terra, recebendo 2d8 pontos de vida temporários. Os PV temporários desaparecem ao final da cena. ", 1, "Concede pontos de vida temporários.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.NECROMANCIA, TipoAcao.PADRAO, TipoAlvo.PROPRIO, AlcanceMagia.PESSOAL, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        const PV = Dado.rolarVarios(2, 8);
        usuario.adicionarEfeito(new EfeitoVitalidadeFantasma(PV));
    }
}