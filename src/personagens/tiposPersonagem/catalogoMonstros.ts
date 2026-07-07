import { Atributos } from "../atributos/atributos.js";

import { Pericia } from "../../pericias/pericia.js";
import { CatalogoPericias } from "../../pericias/catalogoPericias.js";

import { Habilidade } from "../../poderes/habilidades.js";

import { Arma } from "../../itens/arma.js";
import { CatalogoArmas } from "../../itens/catalogos/catalogoArmas.js";

import { Armadura } from "../../itens/armadura.js";
import { CatalogoArmaduras } from "../../itens/catalogos/catalogoArmadura.js";

import { ComportamentoIA, IAAgressiva, IAArqueira, IAConjuradora } from "../../combate/IA.js";

export enum Tamanho {
    PEQUENO,
    MEDIO,
    GRANDE
}

export interface DadosMonstro {
    nome: string;
    nivel: number;
    nd: number;
    xp: number;
    vida: number;
    tamanho: Tamanho;
    deslocamento: number;
    atributos: Atributos;
    pericias: {
        pericia: Pericia;
        bonus: number;
    }[];
    armaPrincipal?: Arma;
    armaSecundaria?: Arma;
    armaNatural?: Arma;
    armadura?: Armadura;
    habilidades?: Habilidade[];
    comportamento: ComportamentoIA;
}

/* static readonly ARANHA_GIGANTE: DadosMonstro = {
        nome:, nivel: nd:, xp:, vida:, tamanho:, deslocamento:, atributos: new Atributos(), pericias: [{pericia:, bonus:}], armaNatural:,
        comportamento: new IAAgressiva()
    }; */

export class CatalogoMonstros {

    static readonly ARANHA_GIGANTE: DadosMonstro = {
        nome: "Aranha Gigante", nivel: 1, nd: 2, xp: 1, vida: 77, tamanho: Tamanho.GRANDE, deslocamento: 12, atributos: new Atributos(20, 19, 12, 1, 10, 2), pericias: [{pericia: CatalogoPericias. INICIATIVA, bonus: 7}, {pericia: CatalogoPericias.PERCEPCAO, bonus: 3}], armaNatural: CatalogoArmas.MORDIDA, comportamento: new IAAgressiva()
    };

    static readonly BANDIDO: DadosMonstro = {
        nome: "Bandido", nivel: 1, nd: 1/4, xp: 1, vida: 6, tamanho: Tamanho.MEDIO, deslocamento: 9, atributos: new Atributos(15, 14, 13, 9, 10, 8), pericias: [{pericia: CatalogoPericias.INICIATIVA, bonus: 5}, {pericia: CatalogoPericias.PERCEPCAO, bonus: 1}], armaPrincipal: CatalogoArmas.CLAVA, armadura: CatalogoArmaduras.ARMADURA_DE_COURO, comportamento: new IAAgressiva()
    };

    static readonly CULTISTA: DadosMonstro = {
        nome: "Cultista", nivel: 1, nd: 7, xp: 1, vida: 160, tamanho: Tamanho.MEDIO, deslocamento: 9, atributos: new Atributos(8, 18, 12, 18, 20, 20), pericias: [{pericia: CatalogoPericias.INICIATIVA, bonus: 17}, {pericia: CatalogoPericias.PERCEPCAO, bonus: 18}, {pericia: CatalogoPericias.ENGANACAO, bonus: 20}, {pericia: CatalogoPericias.INTUICAO, bonus: 20}, {pericia: CatalogoPericias.RELIGIAO, bonus: 17}], armaPrincipal: CatalogoArmas.ADAGA, armaSecundaria: CatalogoArmas.ESCUDO_LEVE, armadura: CatalogoArmaduras.COURACA, comportamento: new IAConjuradora(["Hipnotismo"])
    };

    static readonly ESQUELETO: DadosMonstro = {
        nome: "Esqueleto", nivel: 1, nd: 2, xp: 1, vida: 40, tamanho: Tamanho.MEDIO, deslocamento: 6, atributos: new Atributos(20, 14, 12, 0, 10, 1), pericias: [{pericia: CatalogoPericias.INICIATIVA, bonus: 10}, {pericia: CatalogoPericias.PERCEPCAO, bonus: 4}], armaPrincipal: CatalogoArmas.ESPADA_LONGA, armaSecundaria: CatalogoArmas.ESCUDO_PESADO, armadura: CatalogoArmaduras.COTA_DE_MALHA, comportamento: new IAAgressiva()
    };

    static readonly ESQUELETO_ARQUEIRO: DadosMonstro = {
        nome: "Esqueleto Arqueiro", nivel: 1, nd: 2, xp: 1, vida: 40, tamanho: Tamanho.MEDIO, deslocamento: 6, atributos: new Atributos(20, 14, 12, 0, 10, 1), pericias: [{pericia: CatalogoPericias.INICIATIVA, bonus: 8}, {pericia: CatalogoPericias.PERCEPCAO, bonus: 5}, {pericia: CatalogoPericias.PONTARIA, bonus: 1}], armaPrincipal: CatalogoArmas.ARCO_LONGO, armadura: CatalogoArmaduras.COTA_DE_MALHA, comportamento: new IAArqueira()
    };

    static readonly GOBLIN: DadosMonstro = {
        nome: "Goblin", nivel: 1,nd: 1/3, xp: 1, vida: 9, tamanho: Tamanho.PEQUENO, deslocamento: 9, atributos: new Atributos(5, 12, 7, 7, 3, 2), pericias: [{pericia: CatalogoPericias.INICIATIVA, bonus: 4}, {pericia: CatalogoPericias.PERCEPCAO, bonus: 0}], armaPrincipal: CatalogoArmas.ADAGA, comportamento: new IAAgressiva()
    };

    static readonly GOBLIN_ARQUEIRO: DadosMonstro = {
        nome: "Goblin Arqueiro", nivel: 1,nd: 1/3, xp: 1, vida: 9, tamanho: Tamanho.PEQUENO, deslocamento: 9, atributos: new Atributos(5, 12, 7, 7, 3, 2), pericias: [{pericia: CatalogoPericias.INICIATIVA, bonus: 3}, {pericia: CatalogoPericias.PERCEPCAO, bonus: 1}, {pericia: CatalogoPericias.PONTARIA, bonus: 0}], armaPrincipal: CatalogoArmas.ARCO_CURTO, comportamento: new IAArqueira()
    };

    static readonly GOBLIN_XAMA: DadosMonstro = {
        nome: "Goblin Xamã", nivel: 1,nd: 1/3, xp: 1, vida: 9, tamanho: Tamanho.PEQUENO, deslocamento: 9, atributos: new Atributos(5, 12, 7, 7, 3, 2), pericias: [{pericia: CatalogoPericias.INICIATIVA, bonus: 4}, {pericia: CatalogoPericias.PERCEPCAO, bonus: 0}], armaPrincipal: CatalogoArmas.ADAGA, comportamento: new IAConjuradora(["Explosão de Chamas"])
    };

    static readonly HOBGOBLIN: DadosMonstro = {
        nome: "Hobgoblin", nivel: 1, nd: 1, xp: 1, vida: 18, tamanho: Tamanho.MEDIO, deslocamento: 6, atributos: new Atributos(18, 14, 12, 9, 8, 6), pericias: [{pericia: CatalogoPericias.INICIATIVA, bonus: 5}, {pericia: CatalogoPericias.PERCEPCAO, bonus: 2}], armaPrincipal: CatalogoArmas.ESPADA_LONGA, comportamento: new IAAgressiva()
    };

    static readonly KOBOLD: DadosMonstro = {
        nome: "Kobold", nivel: 1, nd: 2, xp: 1, vida: 20, tamanho: Tamanho.MEDIO, deslocamento: 9, atributos: new Atributos(10, 17, 10, 8, 11, 6), pericias: [{pericia: CatalogoPericias.INICIATIVA, bonus: 7}, {pericia: CatalogoPericias.PERCEPCAO, bonus: 21}], armaNatural: CatalogoArmas.MORDIDA, armaPrincipal: CatalogoArmas.GARRA, armaSecundaria: CatalogoArmas.GARRA, comportamento: new IAAgressiva()
    };

    static readonly LOBO: DadosMonstro = {
        nome: "Lobo", nivel: 1, nd: 1/2, xp: 1, vida: 21, tamanho: Tamanho.MEDIO, deslocamento: 15, atributos: new Atributos(16, 16, 16, 2, 14, 6), pericias: [{pericia: CatalogoPericias.INICIATIVA, bonus: 4}, {pericia: CatalogoPericias.PERCEPCAO, bonus: 7}], armaNatural: CatalogoArmas.MORDIDA, comportamento: new IAAgressiva()
    };

    static readonly NECROMANTE: DadosMonstro = {
        nome: "Necromante", nivel: 1, nd: 4, xp: 1, vida: 27, tamanho: Tamanho.MEDIO, deslocamento: 12, atributos: new Atributos(10, 12, 12, 20, 10, 9), pericias: [{pericia: CatalogoPericias.INICIATIVA, bonus: 9}, {pericia: CatalogoPericias.PERCEPCAO, bonus: 6}], armaPrincipal: CatalogoArmas.ADAGA, comportamento: new IAConjuradora(["Amedrontar", "Armadura Arcana", "Raio do Enfraquecimento", "Vitalidade Fantasma"])
    };

    static readonly ORC: DadosMonstro = {
        nome: "Orc", nivel: 1, nd: 1/3, xp: 1, vida: 8, tamanho: Tamanho.MEDIO, deslocamento: 9, atributos: new Atributos(18, 11, 14, 8, 9, 8), pericias: [{pericia: CatalogoPericias.INICIATIVA, bonus: 3}, {pericia: CatalogoPericias.PERCEPCAO, bonus: 0}], armaPrincipal: CatalogoArmas.MACHADO_DE_BATALHA, comportamento: new IAAgressiva()
    };

    static readonly RATO_GIGANTE: DadosMonstro = {
        nome: "Rato Gigante", nivel: 1, nd: 1/4, xp: 1, vida: 5, tamanho: Tamanho.PEQUENO, deslocamento: 12, atributos: new Atributos(10, 17, 12, 1, 12, 4), pericias: [{pericia: CatalogoPericias.INICIATIVA, bonus: 5}, {pericia: CatalogoPericias.PERCEPCAO, bonus: 3}], armaNatural: CatalogoArmas.MORDIDA, comportamento: new IAAgressiva()
    }

    static readonly ZUMBI: DadosMonstro = {
        nome: "Zumbi", nivel: 1, nd: 1/3, xp: 1, vida: 12, tamanho: Tamanho.MEDIO, deslocamento: 6, atributos: new Atributos(17, 8, 15, 0, 8, 1), pericias: [{pericia: CatalogoPericias.INICIATIVA, bonus: 0}, {pericia: CatalogoPericias.PERCEPCAO, bonus: 0}], armaNatural: CatalogoArmas.MORDIDA, comportamento: new IAAgressiva()
    };
}



