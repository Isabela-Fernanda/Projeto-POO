import { Personagem } from "../personagem.js";

import { Beneficio } from "../../poderes/beneficio.js";
import { Caracteristica } from "../../poderes/caracteristica.js";
import { Habilidade } from "../../poderes/habilidades.js";

import { CatalogoPericias } from "../../pericias/catalogoPericias.js";
import { Tags } from "../../poderes/tags.js";

// ===================================================================== 
// Anão  
// ===================================================================== 
export class ConhecimentoDasRochas extends Beneficio {
    constructor() {
        super("Conhecimento das Rochas", " Você recebe visão no escuro e +2 em testes de Percepção e Sobrevivência realizados no subterrâneo.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.VISAO_NO_ESCURO);
        personagem.adicionarTag(Tags.CONHECIMENTO_DAS_ROCHAS);
    }
}

export class TradicaoDeHeredrimm extends Beneficio {
    constructor() {
        super("Tradição de Heredrimm", "Você é perito nas armas tradicionais anãs, seja por ter treinado com elas, seja por usá-las como ferramentas de ofício. Para você, todos os machados, martelos, marretas e picaretas são armas simples. Você recebe +2 em ataques com essas armas.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.TRADICAO_HEREDRIMM);
    }
}

export class DevagarESempre extends Caracteristica {
    constructor(){
        super("Devagar e Sempre", "Seu deslocamento é 6m (em vez de 9m). Porém, seu deslocamento não é reduzido por uso de armadura ou excesso de carga.");
    }

    aplicar(personagem: Personagem): void {
        personagem.setDeslocamento(6);
        personagem.adicionarTag(Tags.IGNORA_PENALIDADE_DESLOCAMENTO);
    }
}

export class DuroComoPedra extends Caracteristica {
    constructor(){
        super("Duro como Pedra", "Você recebe +3 pontos de vida no 1º nível e +1 por nível seguinte.");
    }

    aplicar(personagem: Personagem): void {
        const bonus = 3 + (personagem.getNivel() - 1);
        personagem.aumentarVidaMaxima(bonus);
    }
}

// ===================================================================== 
//  Elfo  
// ===================================================================== 
export class GracaDeGlorienn extends Caracteristica{
    constructor(){
        super("Graça de Glórienn", "Seu deslocamento é 12m (em vez de 9m).");
    }

    aplicar(personagem: Personagem): void {
        personagem.setDeslocamento(12);
    }
}

export class HerancaFeerica extends Caracteristica {
    constructor(){
        super("Herança Feérica", "Você recebe +1 PM por nível.");
    }

    aplicar(personagem: Personagem): void {
        personagem.aumentarManaMaxima(personagem.getNivel());
    }
}

export class SentidosElficos extends Caracteristica {
    constructor(){
        super("Sentidos Élficos", "Você recebe visão na penumbra e +2 em Misticismo e Percepção.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.VISAO_NA_PENUMBRA);

        personagem.adicionarBonusPericia(CatalogoPericias.MISTICISMO, 2);
        personagem.adicionarBonusPericia(CatalogoPericias.PERCEPCAO, 2);
    }
}

// ======================================================================
// Humano 
// ======================================================================
export class Versatil extends Beneficio {
    constructor() {
        super("Versátil", "Você se torna treinado em duas perícias a sua escolha (não precisam ser da sua classe). Você pode trocar uma dessas perícias por um poder geral a sua escolha.");
    }

    aplicar(personagem: Personagem): void { };
}

/*
// -----------------------------------------------------------------
// ---------------------------- Aggelus ----------------------------
// ----------------------------------------------------------------- 
export class LuzSagrada extends Beneficio {
    constructor() {
        super("Luz Sagrada", "Você recebe +2 em Diplomacia e Intuição. Além disso, pode lançar Luz (como uma magia divina; atributo-chave Carisma). Caso aprenda novamente essa magia, o custo para lançá-la diminui em –1 PM.");
    }
    aplicar(personagem: Personagem): void {
        personagem.adicionarBonusPericia(CatalogoPericias.DIPLOMACIA, 2);
        personagem.adicionarBonusPericia(CatalogoPericias.INTUICAO, 2);
    }
}

// ----------------------------------------------------------------- 
// ---------------------------- Dahllan ---------------------------- 
// ----------------------------------------------------------------- 
export class AmigaDasPlantas extends Beneficio {
    constructor() {
        super("Amiga das Plantas", "Você pode lançar a magia Controlar Plantas (atributo-chave Sabedoria). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarHabilidade(new MagiaControlarPlantas());
    }
}

// ----------------------------------------------------------------- 
// ----------------------------- Goblin ---------------------------- 
// ----------------------------------------------------------------- 
export class Engenhoso extends Beneficio {
    constructor() {
        super("Engenhoso", "Você não sofre penalidades em testes de perícia por não usar kits. Se usar o kit, recebe +2 no teste de perícia.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.ENGENHOSO);
    }
}

// ----------------------------------------------------------------- 
// ----------------------------- Golem ----------------------------- 
// ----------------------------------------------------------------- 
export class Chassi extends Beneficio {
    constructor() {
        super("Chassi", "Seu corpo artificial é resistente, mas rígido. Você recebe +2 na Defesa, mas possui penalidade de armadura –2 e seu deslocamento é 6m. Você leva um dia para vestir ou remover uma armadura (pois precisa acoplar as peças dela a seu chassi).");
    }

    aplicar(personagem: Personagem): void {
        personagem.setDeslocamento(6);
        personagem.adicionarBonusDefesa(2);
    }
}

export class EspiritoElemental extends Beneficio {
    constructor(
        private energia: TipoEnergia
    ) {
        super("Espírito Elemental", "Escolha entre água (frio), ar (eletricidade), fogo (fogo) e terra (ácido). Você é imune a dano causado por essa energia. Se fosse sofrer dano mágico dessa energia, em vez disso cura PV em quantida de igual à metade do dano. Por exemplo, se um golem com espírito elemental do fogo é atingido por uma Bola de Fogo que causa 30 pontos de dano, em vez de sofrer esse dano, ele recupera 15 PV.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarImunidadeEnergia(this.energia);
    }
}

// ----------------------------------------------------------------- 
// ----------------------------- Hynne ----------------------------- 
// ----------------------------------------------------------------- 
export class SorteSalvadora extends Beneficio {
    constructor() {
        super("Sorte Salvadora", "Quando faz um teste de resistência, você pode gastar 1 PM para rolar este teste novamente.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.SORTE_SALVADORA);
    }
}

export class Arremessador extends Beneficio {
    constructor() {
        super("Arremessador", " Quando faz um ataque à distância com uma funda ou uma arma de arremesso, seu dano aumenta em um passo.")
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.ARREMESSADOR);
    }
}

// ----------------------------------------------------------------- 
// ----------------------------- Kliren ---------------------------- 
// ----------------------------------------------------------------- 
export class Hibrido extends Beneficio {
    constructor() {
        super("Híbrido", "Sua natureza multifacetada fez com que você aprendesse conhecimentos variados. Você se torna treinado em uma perícia a sua escolha (não precisa ser da sua classe).");
    }

    aplicar(personagem: Personagem): void {
        console.log("\n=== BENEFÍCIO RACIAL: HÍBRIDO ===");

        while (true) {
            const pericia = CatalogoPericias.escolherPericia(CatalogoPericias.getTodas());

            if (personagem.possuiPericia(pericia)) {
                console.log("Você já possui essa perícia.");
                continue;
            }

            personagem.adicionarPericia(pericia);

            console.log(`Perícia ${pericia.getNome()} adicionada.`);

            break;
        }

    }
}

export class LogicaGnomica extends Beneficio {
    constructor() {
        super("Lógica Gnômica", "Quando faz um teste de atributo ou perícia, você pode gastar 2 PM para substituir o modificador de atributo utilizado por Inteligência. Por exemplo, ao fazer um teste de Atletismo você pode gastar 2 PM para usar seu modificador de Inteligência em vez do modificador de Força.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.LOGICA_GNOMICA);
    }
}

export class OssosFrageis extends Beneficio {
    constructor() {
        super("Ossos Frágeis", "Você sofre 1 ponto de dano adicional por dado de dano de impacto. Por exemplo, se for atingido por uma clava (dano 1d6), sofre 1d6+1 pontos de dano. Se cair de 3m de altura (dano 2d6), sofre 2d6+2 pontos de dano.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.OSSOS_FRAGEIS);
    }
}

export class Vanguardista extends Beneficio {
    constructor() {
        super("Vanguardista", "Você recebe proficiência em armas de fogo e +2 em testes de Ofício (um qualquer, a sua escolha).");
    }

    aplicar(personagem: Personagem): void {
        // Implementar depois
    }
}

// ----------------------------------------------------------------- 
// ----------------------------- Lefou ----------------------------- 
// ----------------------------------------------------------------- 
export class CriaDaTormenta extends Beneficio {
    constructor() {
        super("Cria da Tormenta", "Você é uma criatura do tipo monstro e recebe +5 em testes de resistência contra efeitos causados por lefeu e pela Tormenta.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.CRIATURA_MONSTRO);
        personagem.adicionarTag(Tags.CRIA_DA_TORMENTA);
    }
}

export class Deformidade extends Beneficio {
    constructor() {
        super("Deformidade", "Todo lefou possui defeitos físicos que, embora desagradáveis, conferem certas vantagens. Você recebe +2 em duas perícias a sua escolha. Cada um desses bônus conta como um poder da Tormenta. Você pode trocar um desses bônus por um poder da Tormenta a sua escolha. Esta habilidade não causa perda de Carisma.");
    }

    aplicar(personagem: Personagem): void {
        console.log("\n=== BENEFÍCIO RACIAL: DEFORMIDADE ===");
        let escolha;
        while (true) {
            console.log("1 - Escolha duas perícias para receber +2.");
            console.log("2 - Escolha uma perícia para receber +2 e um poder da Tormenta.");
            escolha = prompt("Escolha: ");

            if (escolha === "1" || escolha === "2") {
                break;
            }

            console.log("Opção inválida.");
        }

        const escolhidas: Pericia[] = [];
        if (escolha === "1") {
            for (let i = 0; i < 2; i++) {
                const pericia = CatalogoPericias.escolherPericia(CatalogoPericias.getTodas());

                if (escolhidas.includes(pericia)) {
                    console.log("Você já escolheu essa perícia.");
                    i--;
                    continue;
                }

                personagem.adicionarBonusPericia(pericia, 2);

                console.log(`Perícia ${pericia.getNome()} melhorada.`);

                escolhidas.push(pericia);
            }
        }

        if (escolha === "2") {
            const pericia = CatalogoPericias.escolherPericia(CatalogoPericias.getTodas());
            personagem.adicionarBonusPericia(pericia, 2);

            console.log(`Perícia ${pericia.getNome()} melhorada.`);

            console.log("Escolha de Poder da Tormenta ainda não implementada.");
        }

        personagem.adicionarPoderTormenta(2);
    }
}

// ----------------------------------------------------------------- 
// --------------------------- Minotauro --------------------------- 
// ----------------------------------------------------------------- 
export class Faro extends Beneficio {
    constructor() {
        super("Faro", "Você tem olfato apurado. Você não fica desprevenido e sofre apenas camuflagem (em vez de camuflagem total) contra inimigos em alcance curto que não possa ver.");
    }
    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.FARO);
    }
}

export class MedoDeAltura extends Beneficio {
    constructor() {
        super("Medo de Altura", "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), você fica abalado.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.MEDO_DE_ALTURA);
    }
}

// ----------------------------------------------------------------- 
// --------------------------- Osteon --------------------------- 
// ----------------------------------------------------------------- 
export class ArmaduraOssea extends Beneficio {
    constructor() {
        super("Armadura Óssea", " Você recebe resistência a corte, frio e perfuração 5.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarResistencia(TipoDano.CORTE, 5);
        personagem.adicionarResistencia(TipoDano.FRIO, 5);
        personagem.adicionarResistencia(TipoDano.PERFURACAO, 5);
    }
}

export class MemoriaPostuma extends Beneficio {
    constructor() {
        super("Memória Póstuma", "Você se torna treinado em uma perícia (não precisa ser da sua classe) ou recebe um poder geral a sua escolha. Como alternativa, você pode ser um osteon de outra raça humanoide que não humano. Neste caso, você ganha uma habilidade dessa raça a sua escolha. Se a raça era de tamanho diferente de Médio, você também possui sua categoria de tamanho.");
    }

    aplicar(personagem: Personagem): void {
        // Implementar depois
    }
}

export class PrecoDaNaoVida extends Beneficio {
    constructor() {
        super("Preço da Não Vida", "Você precisa passar oito horas sob a luz de estrelas ou no subterrâneo. Se fizer isso, recupera PV e PM por descanso em condições normais (osteon não são afetados por condições boas ou ruins de descanso). Caso contrário, sofre os efeitos de fome.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.PRECO_DA_NAO_VIDA);
    }
}

// ----------------------------------------------------------------- 
// ---------------------------- Qareen ----------------------------- 
// ----------------------------------------------------------------- 
export class ResistenciaElemental extends Beneficio {
    constructor(
        private tipo: TipoDano
    ) {
        super("Resistência Elemental", "Conforme sua ascendência, você recebe resistência 10 a um tipo de dano. Escolha uma: frio (qareen da água), eletricida de (do ar), fogo (do fogo), ácido (da terra), luz (da luz) ou trevas (qareen das trevas).");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarResistencia(this.tipo, 10);
    }
}

export class TatuagemMistica extends Beneficio {
    constructor() {
        super("Tatuagem Mística", "Você pode lançar uma magia de 1º círculo a sua escolha (atributo-chave Carisma). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.");
    }

    aplicar(personagem: Personagem): void {
        // Implementar depois
    }
}

export class Desejos extends Beneficio {
    constructor() {
        super("Desejos", "Se lançar uma magia que alguém tenha pedido desde seu último turno, o custo da magia diminui em –1 PM. Fazer um desejo ao qareen é uma ação livre.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.DESEJOS);
    }
}

// ----------------------------------------------------------------- 
// ---------------------------- Sereia ----------------------------- 
// ----------------------------------------------------------------- 
export class CancaoDosMares extends Beneficio {
    constructor() {
        super("Canção dos Mares", "Você pode lançar duas das magias a seguir: Amedrontar, Comando, Despedaçar, Enfeitiçar, Hipnotismo ou Sono (atributo-chave Carisma). Caso aprenda novamente uma dessas magias, seu custo diminui em –1 PM.");
    }

    aplicar(personagem: Personagem): void {
        // Implementar depois
    }
}

export class MestreDoTridente extends Beneficio {
    constructor() {
        super("Mestre do Tridente", "Para você, o tridente é uma arma simples. Além disso, você recebe +2 em rolagens de dano com azagaias, lanças e tridentes.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.MESTRE_DO_TRIDENTE);
    }
}

export class TransformacaoAnfibia extends Beneficio {
    constructor() {
        super("Transformação Anfíbia", "Você pode respirar debaixo d’água e possui uma cauda que fornece deslocamento de natação 12m. Quando fora d’água, sua cauda desaparece e dá lugar a pernas (deslocamento 9m). Se permanecer mais de um dia sem contato com água, você não recupera PM com descanso até voltar para a água (ou, pelo menos, tomar um bom banho!).");
    }

    aplicar(personagem: Personagem): void {
        // Implementar depois
    }
}

// ----------------------------------------------------------------- 
// ---------------------------- Sílfide ----------------------------- 
// ----------------------------------------------------------------- 
export class MagiaDasFadas extends Beneficio {
    constructor() {
        super("Magia das Fadas", "Você pode lançar duas das magias a seguir (todas atributo-chave Carisma): Criar Ilusão, Enfeitiçar, Luz (como uma magia arcana) e Sono. Caso aprenda novamente uma dessas magias, seu custo diminui em –1 PM.");
    }

    aplicar(personagem: Personagem): void {
        // Implementar depois
    }
}

// ----------------------------------------------------------------- 
// ---------------------------- Sulfure ----------------------------- 
// ----------------------------------------------------------------- 
export class SombrasProfanas extends Beneficio {
    constructor() {
        super("Sombras Profanas", "Você recebe +2 em Enganação e Furtividade. Além disso, pode lançar Escuridão (como uma magia divina; atributo chave Inteligência). Caso aprenda novamente essa magia, o custo para lançá-la diminui em –1 PM.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarBonusPericia(CatalogoPericias.ENGANACAO, 2);
        personagem.adicionarBonusPericia(CatalogoPericias.FURTIVIDADE, 2);
        personagem.adicionarHabilidade(new MagiaEscuridaoArcana());
    }
}

// ----------------------------------------------------------------- 
// ---------------------------- Trog ----------------------------- 
// ----------------------------------------------------------------- 
export class Reptiliano extends Beneficio {
    constructor() {
        super("Reptiliano", "Você é uma criatura do tipo monstro e recebe visão no escuro, +1 na Defesa e, se estiver sem armadura ou roupas pesadas, +5 em Furtividade.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.CRIATURA_MONSTRO);
        personagem.adicionarTag(Tags.VISAO_NO_ESCURO);
        personagem.adicionarBonusDefesa(1);
        personagem.adicionarTag(Tags.REPTILIANO);
    }
}

export class SangueFrio extends Beneficio {
    constructor() {
        super("Sangue Frio", "Você sofre 1 ponto de dano adicional por dado de dano de frio.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.SANGUE_FRIO);
    }
} 
*/

/*
// ===================================================================== 
// ---------------------------- Aggelus ---------------------------- 
// ===================================================================== 
export class HerancaDivina extends Caracteristica {
    constructor() {
        super("Herança Divina", "Você é uma criatura do tipo espírito e recebe visão no escuro.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.ESPIRITO)
        personagem.adicionarTag(Tags.VISAO_NO_ESCURO)
    }
}

// ===================================================================== 
// ---------------------------- Dahllan ---------------------------- 
// ===================================================================== 


export class EmpatiaSelvagem extends Caracteristica {
    constructor(){
        super("Empatia Selvagem", "Você pode se comunicar com animais por meio de linguagem corporal e vocalizações. Você pode usar Adestramento para mudar atitude e pedir favores de animais. Caso receba esta habilidade novamente, recebe +2 em Adestramento.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarPericia(CatalogoPericias.ADESTRAMENTO, GrauTreinamento.TREINADO);
    }
}

// ===================================================================== 
// ----------------------------- Goblin ---------------------------- 
// ===================================================================== 
export class Espelunqueiro extends Caracteristica {
    constructor(){
        super("Espelunqueiro", "Você recebe visão no escuro e deslocamento de escalada igual ao seu deslocamento terrestre.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.VISAO_NO_ESCURO);
        // TODO: implementar deslocamento de escalada
    }
}

export class PesteEsguia extends Caracteristica {
    constructor(){
        super("Peste Esguia", "Seu tamanho é Pequeno, mas seu deslocamento se mantém 9m. Apesar de pequenos, goblins são rápidos.");
    }

    aplicar(personagem: Personagem): void {
        personagem.setDeslocamento(9);
        personagem.adicionarTag(Tags.PEQUENO)
    }
}

export class RatoDasRuas extends Caracteristica {
    constructor(){
        super("Rato das Ruas", "Você recebe +2 em Fortitude e sua recuperação de PV e PM nunca é inferior ao seu nível.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarBonusPericia(CatalogoPericias.FORTITUDE, 2);
        personagem.adicionarTag(Tags.REGENERACAO_MAIOR_IGUAL_NIVEL);
    }
}

// ===================================================================== 
// ----------------------------- Golem ----------------------------- 
// ===================================================================== 
export class CriaturaArtificial extends Caracteristica {
    constructor() {
        super("Criatura Artificial", "Você é uma criatura do tipo construto. Recebe visão no escuro e imunidade a doenças, fadiga, sangramento, sono e venenos. Além disso, não precisa respirar, alimentar-se ou dormir. Por fim, não recupera pontos de vida por descanso e não se beneficia de habilidades de cura e itens ingeríveis (comidas, poções etc.). Você precisa ficar inerte por oito horas por dia para recarregar sua fonte de energia. Se fizer isso, recupera PM por descanso em condições normais (golens não são afetados por condições boas ou ruins de descanso).");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.CRIATURA_ARTIFICIAL);

        personagem.adicionarTag(Tags.IMUNE_DOENCAS);
        personagem.adicionarTag(Tags.IMUNE_FADIGA);
        personagem.adicionarTag(Tags.IMUNE_SANGRAMENTO);
        personagem.adicionarTag(Tags.IMUNE_SONO);
        personagem.adicionarTag(Tags.IMUNE_VENENOS);

        personagem.adicionarTag(Tags.NAO_PRECISA_COMER);
        personagem.adicionarTag(Tags.NAO_PRECISA_DORMIR);
        personagem.adicionarTag(Tags.NAO_PRECISA_RESPIRAR);
        personagem.adicionarTag(Tags.NAO_RECEBE_CURA);
        personagem.adicionarTag(Tags.NAO_USA_INGERIVEIS);

        personagem.adicionarTag(Tags.VISAO_NO_ESCURO);
        personagem.adicionarTag(Tags.CURA_POR_ENERGIA_ESCOLHIDA);
    }
}

// ===================================================================== 
// ----------------------------- Hynne ----------------------------- 
// ===================================================================== 
export class PequenoERechonchudo extends Caracteristica {
    constructor(){
        super("Pequeno e Rechonchudo", "Seu tamanho é Pequeno e seu deslocamento é 6m. Você recebe +2 em Enganação e usa o modificador de Destreza para Atletismo (em vez de Força).");
    }

    aplicar(personagem: Personagem): void {
        personagem.setDeslocamento(6);
        personagem.adicionarBonusPericia(CatalogoPericias.ENGANACAO, 2);

        personagem.adicionarTag(Tags.PEQUENO);
        personagem.adicionarTag(Tags.ATLETISMO_COM_DESTREZA);
    }
}

// ===================================================================== 
// ----------------------------- Medusa ---------------------------- 
// ===================================================================== 
export class CriaDeMegalokk extends Caracteristica {
    constructor() {
        super("Cria de Megalokk", "Você é uma criatura do tipo monstro e recebe visão no escuro.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.CRIATURA_MONSTRO);
        personagem.adicionarTag(Tags.VISAO_NO_ESCURO);
    }
}

export class ResistenciaVenenosa extends Caracteristica {
    constructor() {
        super("Resistência Venenosa", " Você recebe resistência a veneno 5 e pode gastar uma ação de movimento e 1PM para envenenar uma arma que esteja empunhando. A arma causa +1d12 pontos de dano de veneno. O veneno dura até você acertar um ataque ou até o fim da cena (o que acontecer primeiro).");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.RESISTENCIA_A_VENENOS);
    }
}

// ===================================================================== 
// --------------------------- Minotauro --------------------------- 
// ===================================================================== 
export class CouroRigido extends Caracteristica {
    constructor(){
        super("Couro Rígido", "Sua pele é dura como a de um touro. Você recebe +1 na Defesa.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarBonusDefesa(1);
    }
}

export class Chifres extends Caracteristica{
    constructor(){
        super("Chifres", "Você possui uma arma natural de chifres. Quando usa a ação atacar, pode gastar 1 PM para fazer um ataque corpo a corpo extra com os chifres.");
    }

    aplicar(personagem: Personagem): void {
        personagem.getEquipamento().equiparArmaNatura(CatalogoArmas.CHIFRE);
    }
}

// ===================================================================== 
// ----------------------------- Osteon ---------------------------- 
// ===================================================================== 
export class NaturezaEsqueletica extends Caracteristica {
    constructor(){
        super("Natureza Esquelética", "Você é uma criatura do tipo morto-vivo. Recebe visão no escuro e imunidade a doenças, fadiga, sangramento, sono e venenos. Além disso, não precisa respirar, alimentar-se ou dormir. Por fim, habilidades mágicas de cura causam dano a você e você não se beneficia de itens ingeríveis (comidas, poções etc.), mas dano de trevas recupera seus PV.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.VISAO_NO_ESCURO);
        personagem.adicionarTag(Tags.IMUNE_DOENCAS);
        personagem.adicionarTag(Tags.IMUNE_FADIGA);
        personagem.adicionarTag(Tags.IMUNE_SANGRAMENTO);
        personagem.adicionarTag(Tags.IMUNE_SONO);
        personagem.adicionarTag(Tags.IMUNE_VENENOS);

        personagem.adicionarTag(Tags.NAO_PRECISA_COMER);
        personagem.adicionarTag(Tags.NAO_PRECISA_DORMIR);
        personagem.adicionarTag(Tags.NAO_PRECISA_RESPIRAR);

        personagem.adicionarTag(Tags.NAO_RECEBE_CURA);
        personagem.adicionarTag(Tags.CURA_CAUSA_DANO);
        personagem.adicionarTag(Tags.TREVAS_CURA);
    }
}

// ===================================================================== 
// ---------------------------- Sílfide ---------------------------- 
// ===================================================================== 
export class EspiritoDaNatureza extends Caracteristica {
    constructor(){
        super("Espírito da Natureza", "Você é uma criatura do tipo espírito, recebe visão na penumbra e pode falar com animais livremente.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.ESPIRITO);
        personagem.adicionarTag(Tags.VISAO_NA_PENUMBRA);
        personagem.adicionarTag(Tags.FALA_COM_ANIMAIS);
    }
}

export class AsasDeBorboleta extends Caracteristica{
    constructor(){
        super("Asas de Borboleta", "Seu tamanho é Minúsculo. Você pode pairar a 1,5m do chão com deslocamento 9m. Isso permite que você ignore terreno difícil e o torna imune a dano por queda (a menos que esteja inconsciente).");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.MINUSCULO);
        personagem.adicionarTag(Tags.IGNORA_TERRENO_DIFICIL);
        personagem.adicionarTag(Tags.IMUNE_DANO_QUEDA);
    }
}

// ===================================================================== 
// ----------------------------- Trog ------------------------------ 
// ===================================================================== 
export class Mordida extends Caracteristica {
    constructor(){
        super("Mordida", "Você possui uma arma natural de mordida. Quando usa a ação atacar, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.");
    }

    aplicar(personagem: Personagem): void {
        personagem.getEquipamento().equiparArmaNatura(CatalogoArmas.MORDIDA);
    }
}
*/

/* 
// ===================================================================== 
// Dahllan 
// ===================================================================== 
export class ArmaduraDeAllihanna extends Habilidade {
    constructor() {
        super("Armadura de Allihanna", "Você pode gastar uma ação de movimento e 1 PM para transformar sua pele em casca de árvore, recebendo +2 na Defesa até o fim da cena.", 1, TipoAcao.MOVIMENTO, TipoAlvo.PROPRIO);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        usuario.adicionarEfeito(new EfeitoArmaduraDeAllihanna());
    }
}

// ===================================================================== 
// Golem  
// ===================================================================== 
export class CanalizarReparos extends Habilidade {
    constructor() {
        super("Canalizar Reparos", "Como uma ação completa, você pode gastar pontos de mana para recuperar pontos de vida, à taxa de 5 PV por PM.", 0, TipoAcao.COMPLETA, TipoAlvo.PROPRIO);
    }

    usar(usuario: Personagem): void {
        const quantidadePM = Number(prompt("Quanta mana deseja gastar? (1PM = 5PV)"));

        if (quantidadePM <= 0) {
            console.log("Valor inválido.");
            return;
        }

        if (!usuario.gastarMana(quantidadePM)) {
            console.log("Mana insuficiente.");
            return;
        }

        console.log(`${usuario.getNome()} ativou Canalizar Reparos, a vida dele está se regenerando.`);

        usuario.regenerarVida(5 * quantidadePM);
    }
}

// ===================================================================== 
// Medusa 
// ===================================================================== 
export class NaturezaVenenosa extends Habilidade {
    constructor() {
        super("Natureza Venenosa", "Você pode gastar uma ação de movimento e 1PM para envenenar uma arma que esteja empunhando. A arma causa +1d12 pontos de dano de veneno. O veneno dura até você acertar um ataque ou até o fim da cena (o que acontecer primeiro).", 1, TipoAcao.MOVIMENTO, TipoAlvo.PROPRIO);
    }

    usar(usuario: Personagem): void {
        console.log(`${usuario.getNome()} envenenou sua arma.`);
        // Preciso implementar a parte da arma e do combate
    }
}

export class OlharAtordoante extends Habilidade {
    constructor() {
        super("Olhar Atordoante", " Você pode gastar uma ação de movimento e 1 PM para forçar uma criatura em alcance curto a fazer um teste de Fortitude (CD Car). Se a criatura falhar, fica atordoada por 1 rodada. Se passar, fica imune a esta habilidade por um dia.", 1, TipoAcao.MOVIMENTO, TipoAlvo.INIMIGO);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        console.log(`${usuario.getNome()} tenta atordoar ${alvo?.getNome()}`);
        // Preciso implementar o efeito e o combate
    }
}

// ===================================================================== 
// Silfide 
// ===================================================================== 
export class Voo extends Habilidade {
    constructor() {
        super("Voo Feérico", "Você pode gastar 1 PM por rodada para voar com deslocamento de 12m.", 1, TipoAcao.MOVIMENTO, TipoAlvo.PROPRIO);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        //Não sei direito como implemntar
    }
}

// ===================================================================== 
// Trog  
// ===================================================================== 
export class MauCheiro extends Habilidade {
    constructor() {
        super("Mau Cheiro", "Você pode gastar uma ação padrão e 2 PM para expelir um gás fétido. Todas as criaturas (exceto trogs) em alcance curto devem passar em um teste de Fortitude contra veneno (CD Con) ou ficarão enjoadas durante 1d6 rodadas. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia.", 2, TipoAcao.PADRAO, TipoAlvo.QUALQUER);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        //Não sei direito como implemntar
    }
} */

