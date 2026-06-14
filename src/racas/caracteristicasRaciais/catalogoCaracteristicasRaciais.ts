import { Personagem } from "../../personagens/personagem.ts";
import { CaracteristicaRacial } from "./caracteristicaRacial.ts";
import { Tags } from "../../poderes/tags.ts";

import { CatalogoPericias } from "../../pericias/catalogoPericias.ts";
import { GrauTreinamento } from "../../pericias/grauTreinamento.ts";

import { CatalogoArmas } from "../../inventario/itens/catalogoArmas.ts"

/* ----------------------------------------------------------------- */
/* ---------------------------- Aggelus ---------------------------- */
/* ----------------------------------------------------------------- */
export class HerancaDivina extends CaracteristicaRacial {
    constructor() {
        super("Herança Divina", "Você é uma criatura do tipo espírito e recebe visão no escuro.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.ESPIRITO)
        personagem.adicionarTag(Tags.VISAO_NO_ESCURO)
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Anão ------------------------------ */
/* ----------------------------------------------------------------- */
export class DevagarESempre extends CaracteristicaRacial {
    constructor(){
        super("Devagar e Sempre", "Seu deslocamento é 6m (em vez de 9m). Porém, seu deslocamento não é reduzido por uso de armadura ou excesso de carga.");
    }

    aplicar(personagem: Personagem): void {
        personagem.setDeslocamento(6);
        personagem.adicionarTag(Tags.IGNORA_PENALIDADE_DESLOCAMENTO);
    }
}

export class DuroComoPedra extends CaracteristicaRacial {
    constructor(){
        super("Duro como Pedra", "Você recebe +3 pontos de vida no 1º nível e +1 por nível seguinte.");
    }

    aplicar(personagem: Personagem): void {
        const bonus = 3 + (personagem.getNivel() - 1);
        personagem.aumentarVidaMaxima(bonus);
    }
}

/* ----------------------------------------------------------------- */
/* ---------------------------- Dahllan ---------------------------- */
/* ----------------------------------------------------------------- */


export class EmpatiaSelvagem extends CaracteristicaRacial {
    constructor(){
        super("Empatia Selvagem", "Você pode se comunicar com animais por meio de linguagem corporal e vocalizações. Você pode usar Adestramento para mudar atitude e pedir favores de animais. Caso receba esta habilidade novamente, recebe +2 em Adestramento.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarPericia(CatalogoPericias.ADESTRAMENTO, GrauTreinamento.TREINADO);
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Elfo ------------------------------ */
/* ----------------------------------------------------------------- */
export class GracaDeGlorienn extends CaracteristicaRacial{
    constructor(){
        super("Graça de Glórienn", "Seu deslocamento é 12m (em vez de 9m).");
    }

    aplicar(personagem: Personagem): void {
        personagem.setDeslocamento(12);
    }
}

export class HerancaFeerica extends CaracteristicaRacial {
    constructor(){
        super("Herança Feérica", "Você recebe +1 PM por nível.");
    }

    aplicar(personagem: Personagem): void {
        personagem.aumentarManaMaxima(personagem.getNivel());
    }
}

export class SentidosElficos extends CaracteristicaRacial {
    constructor(){
        super("Sentidos Élficos", "Você recebe visão na penumbra e +2 em Misticismo e Percepção.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.VISAO_NA_PENUMBRA);

        personagem.adicionarBonusPericia(CatalogoPericias.MISTICISMO, 2);
        personagem.adicionarBonusPericia(CatalogoPericias.PERCEPCAO, 2);
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Goblin ---------------------------- */
/* ----------------------------------------------------------------- */
export class Espelunqueiro extends CaracteristicaRacial {
    constructor(){
        super("Espelunqueiro", "Você recebe visão no escuro e deslocamento de escalada igual ao seu deslocamento terrestre.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.VISAO_NO_ESCURO);
        // TODO: implementar deslocamento de escalada
    }
}

export class PesteEsguia extends CaracteristicaRacial {
    constructor(){
        super("Peste Esguia", "Seu tamanho é Pequeno, mas seu deslocamento se mantém 9m. Apesar de pequenos, goblins são rápidos.");
    }

    aplicar(personagem: Personagem): void {
        personagem.setDeslocamento(9);
        personagem.adicionarTag(Tags.PEQUENO)
    }
}

export class RatoDasRuas extends CaracteristicaRacial {
    constructor(){
        super("Rato das Ruas", "Você recebe +2 em Fortitude e sua recuperação de PV e PM nunca é inferior ao seu nível.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarBonusPericia(CatalogoPericias.FORTITUDE, 2);
        personagem.adicionarTag(Tags.REGENERACAO_MAIOR_IGUAL_NIVEL);
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Golem ----------------------------- */
/* ----------------------------------------------------------------- */
export class CriaturaArtificial extends CaracteristicaRacial {
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

// Eu não criei nada relacionado a origem dos personagens então estou deixando comentado
/* export class SemOrigem extends CaracteristicaRacial {
    constructor() {
        super("Sem Origem", "Como uma criatura artificial, você já foi construído “pronto”. Não teve uma infância — portanto, não tem direito a escolher uma origem e receber benefícios por ela.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.SEM_ORIGEM);
    }
} */

/* ----------------------------------------------------------------- */
/* ----------------------------- Hynne ----------------------------- */
/* ----------------------------------------------------------------- */
export class PequenoERechonchudo extends CaracteristicaRacial {
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

/* ----------------------------------------------------------------- */
/* ----------------------------- Medusa ---------------------------- */
/* ----------------------------------------------------------------- */
export class CriaDeMegalokk extends CaracteristicaRacial {
    constructor() {
        super("Cria de Megalokk", "Você é uma criatura do tipo monstro e recebe visão no escuro.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.CRIATURA_MONSTRO);
        personagem.adicionarTag(Tags.VISAO_NO_ESCURO);
    }
}

export class ResistenciaVenenosa extends CaracteristicaRacial {
    constructor() {
        super("Resistência Venenosa", " Você recebe resistência a veneno 5 e pode gastar uma ação de movimento e 1PM para envenenar uma arma que esteja empunhando. A arma causa +1d12 pontos de dano de veneno. O veneno dura até você acertar um ataque ou até o fim da cena (o que acontecer primeiro).");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.RESISTENCIA_A_VENENOS);
    }
}

/* ----------------------------------------------------------------- */
/* --------------------------- Minotauro --------------------------- */
/* ----------------------------------------------------------------- */
export class CouroRigido extends CaracteristicaRacial {
    constructor(){
        super("Couro Rígido", "Sua pele é dura como a de um touro. Você recebe +1 na Defesa.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarBonusDefesa(1);
    }
}

export class Chifres extends CaracteristicaRacial{
    constructor(){
        super("Chifres", "Você possui uma arma natural de chifres. Quando usa a ação atacar, pode gastar 1 PM para fazer um ataque corpo a corpo extra com os chifres.");
    }

    aplicar(personagem: Personagem): void {
        personagem.getEquipamento().equiparArma(CatalogoArmas.CHIFRE);
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Osteon ---------------------------- */
/* ----------------------------------------------------------------- */
export class NaturezaEsqueletica extends CaracteristicaRacial {
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

/* ----------------------------------------------------------------- */
/* ---------------------------- Sílfide ---------------------------- */
/* ----------------------------------------------------------------- */
export class EspiritoDaNatureza extends CaracteristicaRacial {
    constructor(){
        super("Espírito da Natureza", "Você é uma criatura do tipo espírito, recebe visão na penumbra e pode falar com animais livremente.");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.ESPIRITO);
        personagem.adicionarTag(Tags.VISAO_NA_PENUMBRA);
        personagem.adicionarTag(Tags.FALA_COM_ANIMAIS);
    }
}

export class AsasDeBorboleta extends CaracteristicaRacial{
    constructor(){
        super("Asas de Borboleta", "Seu tamanho é Minúsculo. Você pode pairar a 1,5m do chão com deslocamento 9m. Isso permite que você ignore terreno difícil e o torna imune a dano por queda (a menos que esteja inconsciente).");
    }

    aplicar(personagem: Personagem): void {
        personagem.adicionarTag(Tags.MINUSCULO);
        personagem.adicionarTag(Tags.IGNORA_TERRENO_DIFICIL);
        personagem.adicionarTag(Tags.IMUNE_DANO_QUEDA);
    }
}

/* ----------------------------------------------------------------- */
/* ----------------------------- Trog ------------------------------ */
/* ----------------------------------------------------------------- */
export class Mordida extends CaracteristicaRacial {
    constructor(){
        super("Mordida", "Você possui uma arma natural de mordida. Quando usa a ação atacar, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.");
    }

    aplicar(personagem: Personagem): void {
        personagem.getEquipamento().equiparArma(CatalogoArmas.MORDIDA);
    }
}