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
        const participantes = new Set<Personagem>();

        for (const detectado of detectados) {

            participantes.add(detectado);

            if (detectado instanceof Monstro) {
                detectado.entrarEmAlerta();
            }

            const sala = mapa.getSalaDaEntidade(detectado);

            if (!sala) {
                continue;
            }

            const aliados = mapa.getEntidades().filter(entidade => {

                if (entidade === detectado) {
                    return false;
                }

                if (entidade.getTime() !== detectado.getTime()) {
                    return false;
                }

                const salaAliado = mapa.getSalaDaEntidade(entidade);

                return salaAliado === sala;
            });

            for (const aliado of aliados) {
                participantes.add(aliado);

                if (aliado instanceof Monstro) {
                    aliado.entrarEmAlerta();
                }
            }
        }

        return [...participantes];
    }
}