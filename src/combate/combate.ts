import { Personagem } from "../personagens/personagem.ts";
import { OrdemTurnos } from "./turno.ts";
import { Rodada } from "./rodada.ts";

export class Combate {
    constructor(
        private participantes: Personagem[]
    ) {}

    iniciar(): void {
        let ordem = OrdemTurnos.determinar(this.participantes);

        console.log("\n=== INICIATIVA ===");

        ordem.forEach((personagem, indice) => {
                console.log(`${indice + 1}º ${personagem.getNome()}`);
            }
        );

        let numeroRodada = 1;

        while(this.combateAtivo()){
            console.log(`\n===== RODADA ${numeroRodada} =====`);

            const rodada = new Rodada(ordem);

            rodada.executar();

            this.removerDerrotados();

            ordem = ordem.filter(p => p.estaVivo());

            numeroRodada++;
        }
        console.log("\nCombate encerrado.");
    }

    private combateAtivo(): boolean {
        const vivos = this.participantes.filter(p => p.estaVivo());

        return vivos.length > 1;
    }

    private removerDerrotados(): void {
    this.participantes =
        this.participantes.filter(
            p => p.estaVivo()
        );
}
}

/* export class Combate {
    atacar(atacante: Personagem, alvo: Personagem): void {
        const resultado = TesteAtaque.executarAtaque(atacante, alvo);

        console.log(`${atacante.getNome()} ataca ${alvo.getNome()}`);

        console.log(`Ataque: ${resultado.totalAtaque} (d20=${resultado.rolagem}).`)

        if(!resultado.acertou) {
            console.log("ERROU!");
            return;
        }

        if(resultado.critico) {
            console.log("ACERTO CRÍTICO!");
        }

        alvo.receberDano(resultado.dano);

        console.log(`${alvo.getNome()} sofreu ${resultado.dano} de dano.`);

        console.log(`PV: ${alvo.getVidaAtual()}/${alvo.getVidaMaxima()}`);
        
        if(!alvo.estaVivo()) {
            console.log(`${alvo.getNome()} foi derrotado!`);
        }
    }
} */