import { Personagem } from "../personagens/personagem.js";
import { Condicao } from "../combate/tipoCondicao.js";
import { Item } from "../itens/item.js";
import { TagEfeito } from "./tags.js";

export abstract class Efeito {
    constructor(
        protected nome: string,
        protected duracao: number,
        protected condicoes: Condicao[] = [],
        protected proximoEfeito?: Efeito,
    ) { }

    getNome(): string {
        return this.nome;
    }

    getDuracao(): number {
        return this.duracao;
    }

    getCondicoes(): Condicao[] {
        return this.condicoes;
    }

    getProximoEfeito(): Efeito | undefined {
        return this.proximoEfeito;
    }

    possuiCondicao(condicao: Condicao): boolean {
        return this.condicoes.includes(condicao);
    }

    podeAgir(): boolean {
        if (this.condicoes.includes(Condicao.PARALISADO) || this.condicoes.includes(Condicao.INCONSCIENTE) || this.condicoes.includes(Condicao.PASMO)) {
            return false
        } else {
            return true
        }
    }

    reduzirDuracao(): void {
        this.duracao--;
    }

    expirou(): boolean {
        return this.duracao <= 0;
    }

    getTags(): TagEfeito[] {
        return [];
    }

    getTagsAnuladas(): TagEfeito[] {
        return [];
    }

    processar(personagem: Personagem): void { };
    processarObjeto(item: Item): void { };

    getBonusAtaque(): number {
        return 0;
    }

    getBonusDano(): number {
        return 0;
    }

    getBonusDefesa(): number {
        return 0;
    }

    getBonusForca(): number {
        return 0;
    }

    getBonusPericia(): number {
        return 0;
    }

    getBonusResistencia(): number {
        return 0;
    }

    getBonusDeslocamento(): number {
        return 0;
    }

    //Bonus pericias especificas
    getBonusAtletismo(): number {
        return 0;
    }

    getBonusEnganacao(): number {
        return 0;
    }

    getBonusIniciativa(): number {
        return 0;
    }

    getBonusPercepcao(): number {
        return 0;
    }

    // EMITE
    emiteLuz(): boolean {
        return false;
    }

    getRaioLuz(): number {
        return 0;
    }

    emiteEscuridao(): boolean {
        return false;
    }

    getRaioEscururidao(): number {
        return 0;
    }
}