import { Personagem } from "../personagens/personagem.ts";

export class CalculadoraDano {
    

    static calcularAtaqueFisico(
        atacante: Personagem, 
        alvo: Personagem
    ): number {
        const dano = atacante.getForca() + 5 - alvo.getDefesa();
        
        return Math.max(0, dano); // Garante que o dano não seja negativo
    }
}