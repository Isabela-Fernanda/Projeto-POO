import { Personagem } from "../../personagens/personagem.ts";
import { TipoAcao, TipoAlvo } from "../habilidades.ts";
import { Magia, AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, TipoMagia } from "./magia.ts";
import { TipoDano } from "../../combate/tipoDano.ts";

import { Condicao } from "../../combate/tipoCondicao.ts";

import { AreaCircular, AreaMagica, UtilitarioResistencia, UtilitarioCondicao, UtilitarioInvocacao } from "./utilitarios.ts";
import { MagiaArea } from "./magiaArea.ts";
import { MonstroInvocado } from "../../personagens/invocacao.ts";

/* 
    MagiaArea (afeta vários alvos ou uma área)
        Alarme
        Área Escorregadia

    MagiaSustentada (permanece ativa)
        Névoa
        Teia

    MagiaInvocacao (cria criatura/objeto permanente temporário)
        Conjurar Monstro
*/

export class MagiaAlarme extends Magia {
    constructor() {
        super("Alarme", "Você cria uma barreira protetora invisível que detecta qualquer criatura que tocar ou entrar na área protegida. Ao lançar a magia, você pode escolher quais criaturas podem entrar na área sem ativar seus efeitos. Alarme pode emitir um aviso telepático ou sonoro, decidido quando a magia é lançada. Um aviso telepático alerta apenas você, inclusive acordando-o se estiver dormindo, mas apenas se estiver a até 1km da área protegida. Um aviso sonoro alerta todas as criaturas em alcance longo. ", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.ABJURACAO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem): void {
        console.log(`${usuario.getNome()} cria uma área protegida por Alarme.`);
    }
}

export class MagiaAreaEscorregadia extends MagiaArea {
    constructor() {
        super("Área Escorregadia", "Esta magia recobre uma superfície com uma substância gordurosa e escorregadia. Criaturas na área devem passar na resistência para não cair. Nas rodadas seguintes, criaturas que tentem movimentar-se pela área devem fazer testes de Acrobacia para equilíbrio (CD 10).\nÁrea Escorregadia pode tornar um item escorregadio. Uma criatura segurando um objeto afetado deve passar na resistência para não deixar o item cair cada vez que usá-lo. ", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.CONVOCACAO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }
    protected obterArea(): AreaMagica {
        return new AreaCircular(6);
    }

    protected afetarAlvo(usuario: Personagem, alvo: Personagem): void {
        const sucesso = UtilitarioResistencia.testar(alvo, TipoDano.RESTRICAO, usuario.getCDMagia());

        if (!sucesso) {
            UtilitarioCondicao.aplicar(alvo, "Caído", Condicao.CAIDO, 1);
        }
    }
}

export class MagiaNevoa extends Magia {
    constructor() {
        super("Névoa", "Uma névoa espessa eleva-se de um ponto a sua escolha, obscurecendo toda a visão — criaturas a até 1,5m têm camuflagem e criaturas a partir de 3m têm camuflagem total. Um vento forte dispersa a névoa em 4 rodadas e um vendaval a dispersa em 1 rodada. Esta magia não funciona sob a água. ", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.CONVOCACAO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }
    usar(usuario: Personagem): void {
        console.log("Uma área fica coberta por névoa.");
    }
}

export class MagiaTeia extends MagiaArea {
    constructor() {
        super("Teia", "Teia cria várias camadas de fibras entrelaçadas e pegajosas na área. Qualquer criatura na área que falhar na resistência fica enredada. Uma vítima pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo. A área ocupada por Teia é terreno difícil.\nA Teia é inflamável. Qualquer ataque que cause dano de fogo destrói as teias por onde passar, libertando as criaturas enredadas mas deixando-as em chamas.", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.CONVOCACAO, TipoAcao.PADRAO, TipoAlvo.QUALQUER, AlcanceMagia.CURTO, DuracaoMagia.CENA);
    }
    protected obterArea(): AreaMagica {
        return new AreaCircular(6);
    }

    protected afetarAlvo(usuario: Personagem, alvo: Personagem): void {
        const sucesso = UtilitarioResistencia.testar(alvo, TipoDano.RESTRICAO, usuario.getCDMagia());

        if (!sucesso) {
            UtilitarioCondicao.aplicar(alvo, "Preso em Teia", Condicao.ENREDADO, 3);
        }
    }
}

export class MagiaConjurarMonstro extends Magia {
    constructor() {
        super("Conjurar Monstro", "Esta magia conjura um monstro Pequeno que ataca seus inimigos. Você escolhe a aparência do monstro e o tipo de dano que ele pode causar, entre corte, impacto e perfuração. No entanto, ele não é uma criatura real, e sim um construto feito de energia. Se for destruído, ou quando a magia acaba, desaparece com um brilho, sem deixar nada para trás. Você só pode ter um monstro conjurado por esta magia por vez.\nO monstro surge em um ponto escolhido por você dentro do alcance e pode agir no começo do seu próximo turno, sempre na sua Iniciativa. O monstro tem deslocamento 9m e pode fazer uma ação de movimento por rodada. Você pode usar uma ação padrão para dar uma das seguintes ordens a ele.\nMover: o monstro se movimenta o dobro do deslocamento nessa rodada.\nAtacar: o monstro ataca um alvo em alcance corpo a corpo. O ataque acerta automaticamente e causa 2d4+2 pontos de dano.\nLançar Magia: o monstro pode servir como ponto de origem para uma magia lançada por você com execução de uma ação padrão ou menor. Ele pode descarregar um Toque Chocante em um inimigo distante, ou mesmo “cuspir” uma Bola de Fogo! Você gasta PM normalmente para lançar a magia.\nOutros usos criativos para monstros conjurados ficam a critério do mestre. O monstro não age sem receber uma ordem.\nPara efeitos de jogo, o monstro conjurado tem For 14, Des 17 e todos os outros atributos nulos. Ele tem 20 pontos de vida, não tem um valor de Defesa (ataques feitos contra ele acertam automaticamente) e usa o seu bônus para teste de Reflexos. Ele é imune a efeitos que pedem um teste de Fortitude ou Vontade.", 1, "", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.CONVOCACAO, TipoAcao.PADRAO, TipoAlvo.ALIADO, AlcanceMagia.CURTO, DuracaoMagia.SUSTENTADA);
    }
    override usar(usuario: Personagem): void {
        const monstro = new MonstroInvocado(usuario.getNivel(), usuario.getTime(), TipoDano.CORTE);

        UtilitarioInvocacao.invocar(usuario, monstro);
    }
}

/* 
    MagiaArea (afeta vários alvos ou uma área)
        Alarme
        Área Escorregadia

    MagiaSustentada (permanece ativa)
        Névoa
        Teia

    MagiaInvocacao (cria criatura/objeto permanente temporário)
        Conjurar Monstro


SEGUNDO CIRCULO
    MagiaPura (aplica efeito sem teste de resistência)
        Campo de Força
        Dissipar Magia
        Refúgio
        Ligação Telepática
        Localização
        Mapear
        Montaria Arcana
        Salto Dimensional
        Servos Invisíveis
        Aparência Perfeita
        Camuflagem Ilusória
        Esculpir Sons
        Invisibilidade
        Alterar Tamanho
        Metamorfose
        Velocidade

    MagiaResistencia (alvo faz teste de resistência)
        Amarras Etéreas
        Desespero Esmagador
        Marca da Obediência
        Sussurros Insanos

    MagiaDano (causa dano direto)
        Flecha Ácida
        Crânio Voador de Vladislav
        Toque Vampírico

    MagiaArea (afeta vários alvos ou uma área)
        Bola de Fogo
        Relâmpago
        Sopro das Uivantes

    MagiaSustentada (permanece ativa)
        Runa de Proteção

    MagiaInvocacao (cria criatura/objeto permanente temporário)
        Conjurar Mortos-Vivos


TERCEIRO CIRCULO
    MagiaPura (aplica efeito sem teste de resistência)
        Âncora Dimensional
        Dificultar Detecção
        Globo de Invulnerabilidade
        Contato Extraplanar
        Lendas e Histórias
        Vidência
        Convocação Instantânea
        Teletransporte
        Miragem
        Pele de Pedra
        Telecinesia
        Transformação de Guerra
        Voo

    MagiaResistencia (alvo faz teste de resistência)
        Imobilizar
        Selo de Mana

    MagiaDano (causa dano direto)
        Ferver Sangue
        Lança Ígnea de Aleph

    MagiaArea (afeta vários alvos ou uma área)
        Erupção Glacial
        Muralha Elemental
        Tentáculos de Trevas
        Ilusão Lacerante

    MagiaInvocacao (cria criatura/objeto permanente temporário)
        Enxame Rubro de Ichabod
        Servo Morto-Vivo

QUARTO CIRCULO
    MagiaPura (aplica efeito sem teste de resistência)
        Controlar a Gravidade
        Forma Etérea

    MagiaResistencia (alvo faz teste de resistência)
        Alterar Memória
        Marionete

    MagiaDano (causa dano direto)
        Raio Polar
        Desintegrar

    MagiaArea (afeta vários alvos ou uma área)
        Relâmpago Flamejante de Reynard
        Talho Invisível de Edauros
        Explosão Caleidoscópica

    MagiaSustentada (permanece ativa)
        Muralha de Ossos
        Duplicata Ilusória

    MagiaInvocacao (cria criatura/objeto permanente temporário)
        Assassino Fantasmagórico
        Animar Objetos

QUINTO CIRCULO
    MagiaPura (aplica efeito sem teste de resistência)
        Invulnerabilidade
        Alterar Destino
        Projetar Consciência
        Campo Antimagia
        Libertação
        Sonho
        Visão da Verdade
        Viagem Planar
        Controlar o Tempo
        Desejo
        Semiplano
    
    MagiaResistencia (alvo faz teste de resistência)
        Aprisionamento
        Legião
        Palavra Primordial
        Possessão
        Roubar a Alma
        Toque da Morte
    
    MagiaDano (causa dano direto)
        Mata-Dragão

    MagiaArea (afeta vários alvos ou uma área)
        Buraco Negro
        Chuva de Meteoros
        Barragem Elemental de Vectorius
        Deflagração de Mana

    MagiaSustentada (permanece ativa)
        Engenho de Mana
        Réquiem
        Sombra Assassina

    MagiaInvocacao (cria criatura/objeto permanente temporário)
        Conjurar Elemental
        Mão Poderosa de Talude

*/



