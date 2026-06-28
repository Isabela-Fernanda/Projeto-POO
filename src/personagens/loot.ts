import { Item } from "../itens/item.ts";

export interface Loot {
    item: Item;
    chance: number; // 0 a 100 (%)
    quantidadeMin: number;
    quantidadeMax: number;
}

export class Random {

    static inteiro(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static real(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    static chance(percentual: number): boolean {
        return Math.random() * 100 < percentual;
    }

    static escolher<T>(lista: T[]): T {
        return lista[this.inteiro(0, lista.length - 1)];
    }
}