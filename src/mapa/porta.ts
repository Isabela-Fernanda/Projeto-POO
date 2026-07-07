import { LadoSala, Sala } from "./sala.js";
import { Conexao } from "./conexao.js";
import { Personagem } from "../personagens/personagem.js";
import { TileMapa } from "./tileMapa.js";

export enum EstadoPorta {
    ABERTA,
    FECHADA,
    TRANCADA
}

export class Passagem extends Conexao {
    podeAtravessar(personagem: Personagem): boolean {
        return true;
    }

    getSimbolo(): string {
        return ".";
    }

    getTipo(): TileMapa {
        return TileMapa.PASSAGEM;
    }
}

export class Porta extends Conexao {
    constructor(
        origem: Sala,
        destino: Sala,
        ladoA: LadoSala,
        x: number,
        y: number,
        private estado = EstadoPorta.FECHADA,
        private idFechadura: string | "",
    ) {
        super(origem, destino, ladoA, x, y);
    }

    podeAtravessar(personagem: Personagem): boolean {
        if (this.estado === EstadoPorta.ABERTA) return true;

        if (this.estado === EstadoPorta.FECHADA) {
            this.estado = EstadoPorta.ABERTA;
            console.log("Você abriu a porta.");
            return true;
        }

        if (this.estado === EstadoPorta.TRANCADA) {
            const chave = personagem?.getInventario().possuiChave(this.idFechadura);

            if (chave) {
                this.estado = EstadoPorta.ABERTA;
                console.log(`Você destrancou a porta com ${chave.getNome()}.`);
            } else {
                console.log("A porta está trancada.");
            }
            return false;
        }
        return false;
    }

    getSimbolo(): string {
        switch (this.estado) {
            case EstadoPorta.ABERTA: return "/";
            case EstadoPorta.FECHADA: return "+";
            case EstadoPorta.TRANCADA: return "X";
        }
    }

    getTipo(): TileMapa {
        return TileMapa.PORTA;
    }
}

