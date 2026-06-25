import { FacilidadeUso } from "../inventario/equipamento.ts";
import { Arma } from "../inventario/itens/arma.ts";
import { Personagem } from "../personagens/personagem.ts";

export enum TipoAcao {
    LIVRE,
    MOVIMENTO,
    PADRAO,
    COMPLETA,
    REACAO
}

export enum TipoAlvo {
    INIMIGO,
    ALIADO,
    PROPRIO,
    OBJETO,
    CRIATURA,
    QUALQUER
}

export abstract class Habilidade {
    protected ativo = false;

    constructor(
        protected nome: string,
        protected descricao: string,
        protected custoMana: number,
        protected tipoAcao: TipoAcao,
        protected tipoAlvo: TipoAlvo,
        protected precisaAlvo: boolean = true,
    ) { }

    getNome(): string {
        return this.nome;
    }

    getPrecisaAlvo(): boolean {
        return this.precisaAlvo;
    }

    getDescricao(): string {
        return this.descricao;
    }

    getCustoMana(): number {
        return this.custoMana;
    }

    getTipoAcao(): TipoAcao {
        return this.tipoAcao;
    }

    getTipoAlvo(): TipoAlvo {
        return this.tipoAlvo;
    }

    getBonusAtaque(): number {
        return 0;
    }

    getBonusAtaqueArma(arma: Arma): number {
        return 0;
    }

    getBonusAtaqueComArma(): number {
        return 0;
    }

    getBonusDano(): number {
        return 0;
    }

    getBonusDefesa(): number {
        return 0;
    }

    getBonusFortitude(): number {
        return 0;
    }

    getBonusIniciativa(): number {
        return 0;
    }

    getBonusReflexos(): number {
        return 0;
    }

    getBonusVontade(): number {
        return 0;
    }

    getBonusPVPorNivel(): number {
        return 0;
    }

    getBonusPMPorNivel(): number {
        return 0;
    }

    getAcoesMovimentoExtrasPrimeiroTurno(): number {
        return 0;
    }

    estaAtiva(): boolean {
        return false;
    }

    alternar(): void {
        this.ativo = !this.ativo;
    }

    podeAlternar(): boolean {
        return false;
    }

    concedeProficiencia(facilidade: FacilidadeUso): boolean {
        return false;
    }

    abstract usar(usuario: Personagem, alvo?: Personagem): void;

    executar(usuario: Personagem, alvo?: Personagem): boolean {
        if (!usuario.gastarMana(this.custoMana)) {
            console.log(`${usuario.getNome()} não possui PM suficientes.`);
            return false;
        }

        console.log(`${usuario.getNome()} usa ${this.nome}!`);

        this.usar(usuario, alvo);

        return true;
    }
}
