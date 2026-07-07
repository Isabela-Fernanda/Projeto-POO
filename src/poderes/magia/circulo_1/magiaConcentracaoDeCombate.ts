import { Personagem } from "../../../personagens/personagem.js";
import { TipoAcao, TipoAlvo } from "../../habilidades.js";
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, Magia, TipoMagia } from "../magia.js";

import { EfeitoConcentracaoCombate } from "../../efeitos/efeitoConcentracaoCombate.js";

export class MagiaConcentracaoDeCombate extends Magia {
    constructor() {
        super("Concentação de Combate", "Você amplia sua percepção, antecipando movimentos dos inimigos e achando brechas em sua defesa. Quando faz um ataque, você rola dois dados e usa o melhor resultado.", 1, "Seu próximo ataque recebe vantagem.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ADIVINHACAO, TipoAcao.LIVRE, TipoAlvo.PROPRIO, AlcanceMagia.PESSOAL, DuracaoMagia.INSTANTANEA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        usuario.adicionarEfeito(new EfeitoConcentracaoCombate());
    }
}