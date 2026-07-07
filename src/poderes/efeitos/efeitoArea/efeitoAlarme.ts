import { Personagem } from "../../../personagens/personagem.js";
import { EfeitoArea } from "../../efeitoArea.js";

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