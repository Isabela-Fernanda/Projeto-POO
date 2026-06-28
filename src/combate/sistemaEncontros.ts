import { Jogador } from "../personagens/jogador.ts";
import { Personagem } from "../personagens/personagem.ts";
import { Monstro } from "../personagens/inimigo/monstro.ts";
import { Mapa } from "../mapa/mapa.ts";

export class SistemaEncontros {
    static verificarEncontro(jogador: Jogador, mapa: Mapa): Personagem[] | null {
        const inimigosDetectados = mapa.getEntidades().filter(entidade => {
            if (entidade === jogador) {
                return false;
            }

            const distancia = mapa.calcularDistancia(jogador.getX(), jogador.getY(), entidade.getX(), entidade.getY());

            return (distancia <= entidade.getAlcancePercepcao() && mapa.possuiLinhaDeVisao(entidade, jogador));
        });

        if (inimigosDetectados.length === 0) {
            return null;
        }

        const participantes = this.expandirEncontro(inimigosDetectados, mapa);

        return participantes;
    }

    private static expandirEncontro(detectados: Personagem[], mapa: Mapa): Personagem[] {
        console.log("=== DETECTADOS ===");

        for (const d of detectados) {
            console.log(
                d.getNome(),
                d.getSalaAtual()?.getNome()
            );
        }

        const participantes = new Set<Personagem>();

        for (const detectado of detectados) {

            participantes.add(detectado);

            if (detectado instanceof Monstro) {
                detectado.entrarEmAlerta();
            }

            let sala = detectado.getSalaAtual();

            if (!sala) {
                sala = mapa.getSalaPorPosicao(detectado.getX(), detectado.getY());
            }

            if(sala) detectado.setSalaAtual(sala);

            if(!sala) continue;

            const aliados = mapa.getEntidades().filter(entidade => {
                if (entidade === detectado) return false;

                if (entidade.getTime() !== detectado.getTime()) return false;

                const salaAliado = entidade.getSalaAtual();

                return salaAliado === sala;
            });

            for (const aliado of aliados) {
                participantes.add(aliado);

                if (aliado instanceof Monstro) {
                    aliado.entrarEmAlerta();
                }
            }
        }

        console.log("=== PARTICIPANTES ===");

        for (const p of participantes) {
            console.log(
                p.getNome(),
                p.getSalaAtual()?.getNome()
            );
        }
        return [...participantes];
    }
}