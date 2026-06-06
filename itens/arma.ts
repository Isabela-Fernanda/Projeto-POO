import { Item } from "./item.ts"

export class Arma extends Item {
    constructor(
        nome: string,
        peso: number,
        private dano: number,
    ){
        super(nome, peso);
    }

    getDano(): number {
        return this.dano;
    }
}