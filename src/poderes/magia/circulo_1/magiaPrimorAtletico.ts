import { Personagem } from "../../../personagens/personagem.ts";
import { TipoAcao, TipoAlvo } from "../../habilidades.ts";
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, Magia, TipoMagia } from "../magia.ts";

import { EfeitoPrimorAtletico } from "../../efeitos/efeitoPrimorAtletico.ts";

export class MagiaPrimorAtletico extends Magia {
    constructor() {
        super("Primor Atlético", "Você modifica os limites físicos do alvo, que recebe deslocamento +9m e +10 em testes de Atletismo. ", 1, "Aumenta velocidade e capacidade física.", CirculoMagia.PRIMEIRO, TipoMagia.ARCANA, EscolaMagia.TRANSMUTACAO, TipoAcao.PADRAO, TipoAlvo.CRIATURA, AlcanceMagia.TOQUE, DuracaoMagia.CENA);
    }

    usar(usuario: Personagem, alvo?: Personagem): void {
        (usuario ?? alvo).adicionarEfeito(new EfeitoPrimorAtletico());
    }
}