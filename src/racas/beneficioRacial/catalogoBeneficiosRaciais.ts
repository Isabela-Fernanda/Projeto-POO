import { Personagem } from "../../personagens/personagem.ts";

import { BeneficioRacial } from "./beneficioRacial.ts";

import { Pericia } from "../../pericias/pericia.ts";
import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";

import { MagiaLuz } from "../../poderes/magias/magiaLuz.ts";
import { MagiaControlarPlantas } from "../../poderes/magias/magiaControlarPlantas.ts";
import { MagiaEscuridao } from "../../poderes/magias/magiaEsciridao.ts";
import { Tags } from "../../poderes/tags.ts";

import { TipoEnergia } from "../../poderes/tipoEnergia.ts";
import { TipoDano } from "../../combate/tipoDano.ts";

/* ----------------------------------------------------------------- */
/* ---------------------------- Aggelus ---------------------------- */
/* ----------------------------------------------------------------- */
export class LuzSagrada extends BeneficioRacial {
    constructor() {
        super("Luz Sagrada", "Você recebe +2 em Diplomacia e Intuição. Além disso, pode lançar Luz (como uma magia divina; atributo-chave Carisma). Caso aprenda novamente essa magia, o custo para lançá-la diminui em –1 PM.");
    }
    aplicar(personagem: Personagem): void {
        personagem.adicionarBonusPericia(CatalogoPericias.DIPLOMACIA, 2);
        personagem.adicionarBonusPericia(CatalogoPericias.INTUICAO, 2);

        personagem.adicionarHabilidade(new MagiaLuz());
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Anão ------------------------------ */
/* ----------------------------------------------------------------- */
export class ConnhecimentoDasRochas extends BeneficioRacial {
    constructor() {
        super("Conhecimento das Rochas", " Você recebe visão no escuro e +2 em testes de Percepção e Sobrevivência realizados no subterrâneo.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.VISAO_NO_ESCURO);
        personagem.adicionarTag(Tags.CONHECIMENTO_DAS_ROCHAS);
    }
}

export class TradicaoDeHeredrimm extends BeneficioRacial {
    constructor() {
        super("Tradição de Heredrimm", "Você é perito nas armas tradicionais anãs, seja por ter treinado com elas, seja por usá-las como ferramentas de ofício. Para você, todos os machados, martelos, marretas e picaretas são armas simples. Você recebe +2 em ataques com essas armas.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.TRADICAO_HEREDRIMM);
    }
}

/* ----------------------------------------------------------------- */
/* ---------------------------- Dahllan ---------------------------- */
/* ----------------------------------------------------------------- */
export class AmigaDasPlantas extends BeneficioRacial {
    constructor() {
        super("Amiga das Plantas", "Você pode lançar a magia Controlar Plantas (atributo-chave Sabedoria). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarHabilidade(new MagiaControlarPlantas());
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Goblin ---------------------------- */
/* ----------------------------------------------------------------- */
export class Engenhoso extends BeneficioRacial {
    constructor() {
        super("Engenhoso", "Você não sofre penalidades em testes de perícia por não usar kits. Se usar o kit, recebe +2 no teste de perícia.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.ENGENHOSO);
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Golem ----------------------------- */
/* ----------------------------------------------------------------- */
export class Chassi extends BeneficioRacial {
    constructor() {
        super("Chassi", "Seu corpo artificial é resistente, mas rígido. Você recebe +2 na Defesa, mas possui penalidade de armadura –2 e seu deslocamento é 6m. Você leva um dia para vestir ou remover uma armadura (pois precisa acoplar as peças dela a seu chassi).");
    }

    aplicar(personagem: Personagem): void {
        personagem.setDeslocamento(6);
        personagem.adicionarBonusDefesa(2);
    }
}

export class EspiritoElemental extends BeneficioRacial {
    constructor(
        private energia: TipoEnergia
    ) {
        super("Espírito Elemental", "Escolha entre água (frio), ar (eletricidade), fogo (fogo) e terra (ácido). Você é imune a dano causado por essa energia. Se fosse sofrer dano mágico dessa energia, em vez disso cura PV em quantida de igual à metade do dano. Por exemplo, se um golem com espírito elemental do fogo é atingido por uma Bola de Fogo que causa 30 pontos de dano, em vez de sofrer esse dano, ele recupera 15 PV.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarImunidadeEnergia(this.energia);
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Humano ---------------------------- */
/* ----------------------------------------------------------------- */
export class Versatil extends BeneficioRacial {
    constructor() {
        super("Versátil", "Você se torna treinado em duas perícias a sua escolha (não precisam ser da sua classe). Você pode trocar uma dessas perícias por um poder geral a sua escolha.");
    }

    aplicar(personagem: Personagem): void {
        console.log("\n=== BENEFÍCIO RACIAL: VERSÁTIL ===");
        console.log("1 - Escolha 2 pericias para ser treinado.")
        console.log("2 - Escolha 1 pericia e 1 poder geral.")
        const escolha = prompt("Escolha:");

        switch (escolha) {
            case "2":
            //Ainda não implementei poderes gerais
            default:
                for (let i = 0; i < 2; i++) {
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
                break;
        }

    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Hynne ----------------------------- */
/* ----------------------------------------------------------------- */
export class SorteSalvadora extends BeneficioRacial {
    constructor() {
        super("Sorte Salvadora", "Quando faz um teste de resistência, você pode gastar 1 PM para rolar este teste novamente.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.SORTE_SALVADORA);
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Kliren ---------------------------- */
/* ----------------------------------------------------------------- */
export class Hibrido extends BeneficioRacial {
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

export class LogicaGnomica extends BeneficioRacial {
    constructor() {
        super("Lógica Gnômica", "Quando faz um teste de atributo ou perícia, você pode gastar 2 PM para substituir o modificador de atributo utilizado por Inteligência. Por exemplo, ao fazer um teste de Atletismo você pode gastar 2 PM para usar seu modificador de Inteligência em vez do modificador de Força.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.LOGICA_GNOMICA);
    }
}

export class OssosFrageis extends BeneficioRacial {
    constructor() {
        super("Ossos Frágeis", "Você sofre 1 ponto de dano adicional por dado de dano de impacto. Por exemplo, se for atingido por uma clava (dano 1d6), sofre 1d6+1 pontos de dano. Se cair de 3m de altura (dano 2d6), sofre 2d6+2 pontos de dano.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.OSSOS_FRAGEIS);
    }
}

export class Vanguardista extends BeneficioRacial {
    constructor() {
        super("Vanguardista", "Você recebe proficiência em armas de fogo e +2 em testes de Ofício (um qualquer, a sua escolha).");
    }

    aplicar(personagem: Personagem): void {
        // Implementar depois
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Lefou ----------------------------- */
/* ----------------------------------------------------------------- */
export class CriaDaTormenta extends BeneficioRacial {
    constructor() {
        super("Cria da Tormenta", "Você é uma criatura do tipo monstro e recebe +5 em testes de resistência contra efeitos causados por lefeu e pela Tormenta.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.CRIATURA_MONSTRO);
        personagem.adicionarTag(Tags.CRIA_DA_TORMENTA);
    }
}

export class Deformidade extends BeneficioRacial {
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

/* ----------------------------------------------------------------- */
/* --------------------------- Minotauro --------------------------- */
/* ----------------------------------------------------------------- */
export class Faro extends BeneficioRacial {
    constructor() {
        super("Faro", "Você tem olfato apurado. Você não fica desprevenido e sofre apenas camuflagem (em vez de camuflagem total) contra inimigos em alcance curto que não possa ver.");
    }
    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.FARO);
    }
}

export class MedoDeAltura extends BeneficioRacial {
    constructor() {
        super("Medo de Altura", "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), você fica abalado.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.MEDO_DE_ALTURA);
    }
}

/* ----------------------------------------------------------------- */
/* --------------------------- Osteon --------------------------- */
/* ----------------------------------------------------------------- */
export class ArmaduraOssea extends BeneficioRacial {
    constructor() {
        super("Armadura Óssea", " Você recebe resistência a corte, frio e perfuração 5.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarResistencia(TipoDano.CORTE, 5);
        personagem.adicionarResistencia(TipoDano.FRIO, 5);
        personagem.adicionarResistencia(TipoDano.PERFURACAO, 5);
    }
}

export class MemoriaPostuma extends BeneficioRacial {
    constructor() {
        super("Memória Póstuma", "Você se torna treinado em uma perícia (não precisa ser da sua classe) ou recebe um poder geral a sua escolha. Como alternativa, você pode ser um osteon de outra raça humanoide que não humano. Neste caso, você ganha uma habilidade dessa raça a sua escolha. Se a raça era de tamanho diferente de Médio, você também possui sua categoria de tamanho.");
    }

    aplicar(personagem: Personagem): void {
        // Implementar depois
    }
}

export class PrecoDaNaoVida extends BeneficioRacial {
    constructor() {
        super("Preço da Não Vida", "Você precisa passar oito horas sob a luz de estrelas ou no subterrâneo. Se fizer isso, recupera PV e PM por descanso em condições normais (osteon não são afetados por condições boas ou ruins de descanso). Caso contrário, sofre os efeitos de fome.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.PRECO_DA_NAO_VIDA);
    }
}

/* ----------------------------------------------------------------- */
/* ---------------------------- Qareen ----------------------------- */
/* ----------------------------------------------------------------- */
export class ResistenciaElemental extends BeneficioRacial {
    constructor(
        private tipo: TipoDano
    ) {
        super("Resistência Elemental", "Conforme sua ascendência, você recebe resistência 10 a um tipo de dano. Escolha uma: frio (qareen da água), eletricida de (do ar), fogo (do fogo), ácido (da terra), luz (da luz) ou trevas (qareen das trevas).");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarResistencia(this.tipo, 10);
    }
}

export class TatuagemMistica extends BeneficioRacial {
    constructor() {
        super("Tatuagem Mística", "Você pode lançar uma magia de 1º círculo a sua escolha (atributo-chave Carisma). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.");
    }

    aplicar(personagem: Personagem): void {
        // Implementar depois
    }
}

export class Desejos extends BeneficioRacial {
    constructor() {
        super("Desejos", "Se lançar uma magia que alguém tenha pedido desde seu último turno, o custo da magia diminui em –1 PM. Fazer um desejo ao qareen é uma ação livre.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.DESEJOS);
    }
}

/* ----------------------------------------------------------------- */
/* ---------------------------- Sereia ----------------------------- */
/* ----------------------------------------------------------------- */
export class CancaoDosMares extends BeneficioRacial {
    constructor() {
        super("Canção dos Mares", "Você pode lançar duas das magias a seguir: Amedrontar, Comando, Despedaçar, Enfeitiçar, Hipnotismo ou Sono (atributo-chave Carisma). Caso aprenda novamente uma dessas magias, seu custo diminui em –1 PM.");
    }

    aplicar(personagem: Personagem): void {
        // Implementar depois
    }
}

export class MestreDoTridente extends BeneficioRacial {
    constructor() {
        super("Mestre do Tridente", "Para você, o tridente é uma arma simples. Além disso, você recebe +2 em rolagens de dano com azagaias, lanças e tridentes.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.MESTRE_DO_TRIDENTE);
    }
}

export class TransformacaoAnfibia extends BeneficioRacial {
    constructor() {
        super("Transformação Anfíbia", "Você pode respirar debaixo d’água e possui uma cauda que fornece deslocamento de natação 12m. Quando fora d’água, sua cauda desaparece e dá lugar a pernas (deslocamento 9m). Se permanecer mais de um dia sem contato com água, você não recupera PM com descanso até voltar para a água (ou, pelo menos, tomar um bom banho!).");
    }

    aplicar(personagem: Personagem): void {
        // Implementar depois
    }
}

/* ----------------------------------------------------------------- */
/* ---------------------------- Sílfide ----------------------------- */
/* ----------------------------------------------------------------- */
export class MagiaDasFadas extends BeneficioRacial {
    constructor() {
        super("Magia das Fadas", "Você pode lançar duas das magias a seguir (todas atributo-chave Carisma): Criar Ilusão, Enfeitiçar, Luz (como uma magia arcana) e Sono. Caso aprenda novamente uma dessas magias, seu custo diminui em –1 PM.");
    }

    aplicar(personagem: Personagem): void {
        // Implementar depois
    }
}

/* ----------------------------------------------------------------- */
/* ---------------------------- Sulfure ----------------------------- */
/* ----------------------------------------------------------------- */
export class SombrasProfanas extends BeneficioRacial {
    constructor() {
        super("Sombras Profanas", "Você recebe +2 em Enganação e Furtividade. Além disso, pode lançar Escuridão (como uma magia divina; atributo chave Inteligência). Caso aprenda novamente essa magia, o custo para lançá-la diminui em –1 PM.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarBonusPericia(CatalogoPericias.ENGANACAO, 2);
        personagem.adicionarBonusPericia(CatalogoPericias.FURTIVIDADE, 2);

        personagem.adicionarHabilidade(
            new MagiaEscuridao()
        );
    }
}

/* ----------------------------------------------------------------- */
/* ---------------------------- Trog ----------------------------- */
/* ----------------------------------------------------------------- */
export class Reptiliano extends BeneficioRacial {
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

export class SangueFrio extends BeneficioRacial {
    constructor() {
        super("Sangue Frio", "Você sofre 1 ponto de dano adicional por dado de dano de frio.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.SANGUE_FRIO);
    }
}