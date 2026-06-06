import { Personagem } from "./personagem.ts";

export abstract class Jogador extends Personagem {
    protected experiencia: number = 0;
    protected ouro: number = 0;

    ganharExperiencia(valor: number) {
        this.experiencia += valor;
        if (this.experiencia >= this.getNivel() * 100) {
            this.nivel++;
            this.experiencia = 0;
        }
    }
}