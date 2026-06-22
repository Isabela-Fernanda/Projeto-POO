import { Arma, Categoria } from "./itens/arma.ts";
import { Armadura, TipoProtecao } from "./itens/armadura.ts";
import { CatalogoArmas } from "./itens/catalogoArmas.ts";

export enum FacilidadeUso {
    SIMPLES,
    MARCIAIS,
    EXOTICAS,
    DE_FOGO,

    ESCUDO,

    ARMADURA_LEVE,
    ARMADURA_PESADA
}

export class Equipamento {
    private armaNatural?: Arma;
    private maoDireita: Arma = CatalogoArmas.DESARMADO;
    private maoEsquerda: Arma = CatalogoArmas.DESARMADO;
    private armadura?: Armadura;
    private escudo?: Armadura;

    equiparArmaNatura(arma?: Arma) {
        this.armaNatural = arma;
    }

    equiparMaoDireita(arma: Arma): void {
        if (this.maoDireita === this.maoEsquerda && this.maoDireita !== CatalogoArmas.DESARMADO) {
            this.maoEsquerda = CatalogoArmas.DESARMADO;
        }
        this.maoDireita = arma;
    }

    equiparMaoEsquerda(arma: Arma): void {
        if (this.maoDireita === this.maoEsquerda && this.maoDireita !== CatalogoArmas.DESARMADO) {
            this.maoEsquerda = CatalogoArmas.DESARMADO;
        }
        this.maoEsquerda = arma;
    }

    equiparDuasMaos(arma: Arma): void {
        if (arma.getCategoria() === Categoria.DUAS_MAOS || arma.getCategoria() === Categoria.DISPARO) {
            this.maoDireita = arma;
            this.maoEsquerda = arma;
        }
    }

    equiparProtecao(protecao: Armadura): void {
        if (protecao.getTipo() === TipoProtecao.ARMADURA) {
            this.armadura = protecao;
        }

        if (protecao.getTipo() === TipoProtecao.ESCUDO) {
            this.escudo = protecao;
        }
    }

    desequiparMaoDireita(): void {
        this.maoDireita = CatalogoArmas.DESARMADO;
    }

    desequiparMaoEsquerda(): void {
        this.maoEsquerda = CatalogoArmas.DESARMADO;
    }

    desequiparDuasMaos(): void {
        this.maoDireita = CatalogoArmas.DESARMADO;
        this.maoEsquerda = CatalogoArmas.DESARMADO;
    }

    desequiparArmadura(): void {
        this.armadura = undefined;
    }

    desequiparEscudo(): void {
        this.escudo = undefined;
    }

    getEquipados(): void {
        console.log(`Mão direita: ${this.getArmaPrincipal().getNome()}`);
        console.log(`Mão Esquerda: ${this.getArmaSecundaria().getNome()}`);
        console.log(`Armadura: ${this.getArmadura()?.getNome() ?? "Nenhuma"}`);
        console.log(`Escudo: ${this.getEscudo()?.getNome() ?? "Nenhuma"}`);
    }

    getArmaPrincipal(): Arma {
        return this.maoDireita;
    }

    getArmaSecundaria(): Arma {
        return this.maoEsquerda;
    }

    getArmasEquipadas(): Arma[] {
        return [this.maoDireita, this.maoEsquerda];
    }

    getArmadura(): Armadura | undefined {
        return this.armadura;
    }

    getEscudo(): Armadura | undefined {
        return this.escudo;
    }

    estaUsandoDuasArmas(): boolean {
        return (this.maoDireita !== CatalogoArmas.DESARMADO && this.maoEsquerda !== CatalogoArmas.DESARMADO && this.maoDireita !== this.maoEsquerda);
    }

    estaUsandoArmaDeDuasMaos(): boolean {
        return (this.maoDireita === this.maoEsquerda && this.maoDireita !== CatalogoArmas.DESARMADO);
    }

    getArmaSecundariaValida(): Arma | undefined {
        if (this.maoEsquerda === CatalogoArmas.DESARMADO) {
            return undefined;
        }

        return this.maoEsquerda;
    }
}