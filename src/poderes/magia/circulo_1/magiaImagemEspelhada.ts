import { Personagem } from "../../../personagens/personagem.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, Magia, TipoMagia } from "../magia.ts";

import { EfeitoImagemEspelhada } from "../../efeitos/efeitoImagemEspelhada.ts";

export class MagiaImagemEspelhada extends Magia {
    constructor() {
        super("Imagem Espelhada", "Três cópias ilusórias suas aparecem. As duplicatas ficam ao seu redor e imitam suas ações, tornando difícil para um inimigo saber quem atacar. Você recebe +6 na Defesa. Cada vez que um ataque contra você erra, uma das imagens desaparece e o bônus na Defesa diminui em 2. Um oponente deve ver as cópias para ser confundido. Se você estiver invisível, ou o atacante fechar os olhos, você não recebe o bônus (mas o atacante ainda sofre penalidades normais por não enxergar).", 1, "Cria cópias ilusórias que aumentam sua defesa e confundem inimigos.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ILUSAO, TipoAcao.PADRAO, TipoAlvo.PROPRIO, AlcanceMagia.PESSOAL, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        usuario.adicionarEfeito(new EfeitoImagemEspelhada());
    }
}