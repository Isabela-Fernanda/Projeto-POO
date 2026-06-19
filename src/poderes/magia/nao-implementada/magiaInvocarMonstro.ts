import { Personagem } from "../../../personagens/personagem.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { Magia, AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, TipoMagia } from "../magia.ts";
import { TipoDano } from "../../../combate/tipoDano.ts";
import { UtilitarioInvocacao } from "../utilitarios.ts";
import { MonstroInvocado } from "../../../personagens/invocacao.ts";

export class MagiaConjurarMonstro extends Magia {
    constructor() {
        super("Conjurar Monstro", "Esta magia conjura um monstro Pequeno que ataca seus inimigos. Você escolhe a aparência do monstro e o tipo de dano que ele pode causar, entre corte, impacto e perfuração. No entanto, ele não é uma criatura real, e sim um construto feito de energia. Se for destruído, ou quando a magia acaba, desaparece com um brilho, sem deixar nada para trás. Você só pode ter um monstro conjurado por esta magia por vez.\nO monstro surge em um ponto escolhido por você dentro do alcance e pode agir no começo do seu próximo turno, sempre na sua Iniciativa. O monstro tem deslocamento 9m e pode fazer uma ação de movimento por rodada. Você pode usar uma ação padrão para dar uma das seguintes ordens a ele.\nMover: o monstro se movimenta o dobro do deslocamento nessa rodada.\nAtacar: o monstro ataca um alvo em alcance corpo a corpo. O ataque acerta automaticamente e causa 2d4+2 pontos de dano.\nLançar Magia: o monstro pode servir como ponto de origem para uma magia lançada por você com execução de uma ação padrão ou menor. Ele pode descarregar um Toque Chocante em um inimigo distante, ou mesmo “cuspir” uma Bola de Fogo! Você gasta PM normalmente para lançar a magia.\nOutros usos criativos para monstros conjurados ficam a critério do mestre. O monstro não age sem receber uma ordem.\nPara efeitos de jogo, o monstro conjurado tem For 14, Des 17 e todos os outros atributos nulos. Ele tem 20 pontos de vida, não tem um valor de Defesa (ataques feitos contra ele acertam automaticamente) e usa o seu bônus para teste de Reflexos. Ele é imune a efeitos que pedem um teste de Fortitude ou Vontade.", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.CONVOCACAO, TipoAcao.PADRAO, TipoAlvo.ALIADO, AlcanceMagia.CURTO, DuracaoMagia.SUSTENTADA);
    }
    override usar(usuario: Personagem): void {
        const monstro = new MonstroInvocado(usuario.getNivel(), usuario.getTime(), TipoDano.CORTE);

        UtilitarioInvocacao.invocar(usuario, monstro);
    }
}