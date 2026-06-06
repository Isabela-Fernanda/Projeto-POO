import { Personagem } from "./personagem.ts";
import { Atributos } from "./atributos/atributos.ts";

export class Monstro extends Personagem {
    constructor(
        nome: string,
        atributos: Atributos,
        vidaMaxima: number,
        manaMaxima: number,
        protected xpConcedida: number
    ) {
        super(nome, 
            1, 
            undefined as unknown as any, 
            atributos, 
            0, 
            vidaMaxima, 
            manaMaxima, 
            null as unknown as any, 
            null as unknown as any, 
            null as unknown as any, 
            null as unknown as any
        );
    }
    atacar(alvo: Personagem): void {
        const dano = this.atributos.forca * 2;
        alvo.receberDano(dano);
    }
    
}