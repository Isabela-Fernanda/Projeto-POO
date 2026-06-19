import { Personagem } from "../../../personagens/personagem.ts";
import { EfeitoArea } from "../../efeitoArea.ts";

export class EfeitoAlarme extends EfeitoArea {
    constructor(
        x: number,
        y: number,
        raio: number,
        duracao: number,
        private cd: number
    ) {
        super(x, y, raio, duracao);
    }

    afetar(alvo: Personagem): void {
        console.log(`ALARME! ${alvo.getNome()} entrou na área protegida.`);
    }
}