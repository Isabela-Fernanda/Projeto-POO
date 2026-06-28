import { Mapa } from "../mapa/mapa.ts";
import { Personagem } from "../personagens/personagem.ts";
import { OrdemTurnos } from "./turno.ts";
import { Rodada } from "./rodada.ts";
import { Monstro } from "../personagens/tiposPersonagem/monstro.ts";

export class Combate {
    constructor(
        private mapa: Mapa,
        private participantes: Personagem[]
    ) { }

    iniciar(): void {
        let ordem = OrdemTurnos.determinar(this.participantes);
        
        console.log("\n=== INICIATIVA ===");

        ordem.forEach((personagem, indice) => {console.log(`${indice + 1}º ${personagem.getNome()}`);});

        let numeroRodada = 1;

        while (this.combateAtivo()) {
            console.log(`\n===== RODADA ${numeroRodada} =====`);
            const rodada = new Rodada(ordem, this.mapa);
            rodada.executar();
            this.removerDerrotados();
            ordem = ordem.filter(p => p.estaVivo());
            numeroRodada++;
        }
        console.log("\nCombate encerrado.");

        for (const participante of this.participantes) {
            if (participante instanceof Monstro) {
                participante.sairDoAlerta();
            }
        }
    }

    private combateAtivo(): boolean {
        const timesVivos = new Set(this.participantes.filter(p => p.estaVivo()).map(p => p.getTime()));

        return timesVivos.size > 1;
    }

    private removerDerrotados(): void {
        const derrotados = this.participantes.filter(p => !p.estaVivo());

        for (const morto of derrotados) {

            if(morto instanceof Monstro) {
                const loot = morto.gerarLoot();

                this.mapa.criarEspolio(morto.getX(), morto.getY(), loot);
            }
            this.mapa.removerEntidade(morto);
        }

        this.participantes = this.participantes.filter(p => p.estaVivo());
    }
}
