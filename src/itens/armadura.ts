import { Item } from "./item.ts"

export class Armadura extends Item {
    constructor(
        nome: string,
        peso: number,
        private bonusDefesa: number,
    ){
        super(nome, peso);
    }

    getBonusDefesa(): number {
        return this.bonusDefesa;
    }
}