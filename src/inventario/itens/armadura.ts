import { Item } from "./item.ts"

export enum CategoriaArmadura {
    LEVE,
    PESADA
}

export enum TipoProtecao {
    ARMADURA,
    ESCUDO
}

export class Armadura extends Item {
    constructor(
        nome: string,
        peso: number,
        private bonusDefesa: number,
        private categoria: CategoriaArmadura,
        private tipo: TipoProtecao,
        private penalidade: number,
    ){
        super(nome, peso);
    }

    getBonusDefesa(): number {
        return this.bonusDefesa;
    }

    getCategoria(): CategoriaArmadura {
        return this.categoria;
    }

    getTipo(): TipoProtecao {
        return this.tipo;
    }

    getPenalidade(): number {
        return this.penalidade;
    }
}