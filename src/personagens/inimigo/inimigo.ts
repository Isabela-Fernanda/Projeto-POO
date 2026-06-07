import { Personagem } from "../personagem.ts";

export abstract class Inimigo extends Personagem {

    constructor(
        nome: string,
        nivel: number,
        raca: any,
        atributos: any,
        defesa: number,
        vidaMaxima: number,
        manaMaxima: number,
        inventario: any,
        equipamento: any,
        pericias: any,
        habilidades: any
    ) {
        super(nome, nivel, raca, atributos, defesa, vidaMaxima, manaMaxima, inventario, equipamento, pericias, habilidades);
    }

}