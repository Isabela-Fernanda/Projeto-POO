import { Personagem } from "../personagens/personagem.ts";
import { EfeitoArea } from "../poderes/efeitoArea.ts";

export class Mapa {
    private entidades: Personagem[] = [];
    private efeitosArea: EfeitoArea[] = [];
    private objetos: Objeto[] = [];
    private salas: Sala[] = [];

    adicionarEntidade(Entidade: Personagem): void {
        this.entidades.push(Entidade);
    }

    getEntidades(): Personagem[] {
        return this.entidades;
    }

    moverEntidade(entidade: Personagem, destinoX: number, destinoY: number): boolean {
        const dx = destinoX - entidade.getX();
        const dy = destinoY - entidade.getY();
        const distancia = Math.sqrt(dx * dx + dy * dy);

        if (distancia > entidade.getDeslocamento()) {
            return false;
        }

        entidade.setPosicao(destinoX, destinoY);
        return true;
    }

    getEntidadesEmRaio(x: number, y: number, raio: number): Personagem[] {
        return this.entidades.filter(p => {
            const dx = p.getX() - x;
            const dy = p.getY() - y;
            return Math.sqrt(dx * dx + dy * dy) <= raio;
        });
    }

    private largura = 100;
    private altura = 100;
    posicaoValida(x: number, y: number): boolean {
        return (
            x >= 0 &&
            y >= 0 &&
            x < this.largura &&
            y < this.altura
        );
    }

    adicionarEfeitoArea(efeito: EfeitoArea): void {
        this.efeitosArea.push(efeito);
    }

    getEfeitosArea(): EfeitoArea[] {
        return this.efeitosArea;
    }

    processarEfeitosArea(): void {
        for (const efeito of this.efeitosArea) {
            for(const criatura of this.getEntidades()){
                if(efeito.estaDentro(criatura)){
                    efeito.afetar(criatura);
                }
            }

            efeito.reduzirDuracao();
        }

        this.efeitosArea = this.efeitosArea.filter(efeito => !efeito.expirou());
    }
}
