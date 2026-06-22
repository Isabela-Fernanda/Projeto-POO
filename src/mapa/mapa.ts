import { Jogador } from "../personagens/jogador.ts";
import { Personagem } from "../personagens/personagem.ts";
import { EfeitoArea } from "../poderes/efeitoArea.ts";
import { Objeto } from "./objeto.ts";
import { Sala } from "./sala.ts"

export class Mapa {
    private entidades: Personagem[] = [];
    private efeitosArea: EfeitoArea[] = [];
    private objetos: Objeto[] = [];
    private salas: Sala[] = [];

    private largura = 100;
    private altura = 100;

    calcularDistancia(x1: number, y1: number, x2: number, y2: number): number {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    adicionarEntidade(Entidade: Personagem): void {
        this.entidades.push(Entidade);
    }

    removerEntidade(entidade: Personagem): void {
        this.entidades = this.entidades.filter(e => e !== entidade);
    }

    posicionarEntidade(entidade: Personagem, x: number, y: number): boolean {
        if (!this.posicaoValida(x, y)) return false;
        if (this.estaOcupada(x, y)) return false;

        entidade.setPosicao(x, y);
        this.adicionarEntidade(entidade);

        return true;
    }

    getEntidades(): Personagem[] {
        return this.entidades;
    }

    getEntidadePorNome(nome: string): Personagem | undefined {
        return this.entidades.find(entidade => entidade.getNome() === nome);
    }

    moverEntidade(entidade: Personagem, destinoX: number, destinoY: number): boolean {
        const salaAtual = this.getSalaDaEntidade(entidade);
        if (salaAtual) {
            const naBordaX = destinoX === salaAtual.getXInicial() || destinoX === salaAtual.getXInicial() + salaAtual.getLargura();
            const naBordaY = destinoY === salaAtual.getYInicial() || destinoY === salaAtual.getYInicial() + salaAtual.getAltura();

            if (!salaAtual.contem(destinoX, destinoY) || naBordaX || naBordaY) {
                return false;
            }
        }
        if (!this.posicaoValida(destinoX, destinoY)) {
            return false;
        }
        if (this.estaOcupada(destinoX, destinoY)) {
            return false;
        }

        const dx = destinoX - entidade.getX();
        const dy = destinoY - entidade.getY();
        const distancia = Math.sqrt(dx * dx + dy * dy);

        if (distancia > entidade.getDeslocamento()) {
            return false;
        }

        entidade.setPosicao(destinoX, destinoY);
        return true;
    }

    getEntidadesAdjacentes(entidade: Personagem): Personagem[] {
        return this.entidades.filter(e => {
            if (e === entidade) {
                return false;
            }
            return entidade.estaAdjacente(e);
        });
    }

    getEntidadesEmRaio(x: number, y: number, raio: number): Personagem[] {
        return this.entidades.filter(p => {
            return this.calcularDistancia(p.getX(), p.getY(), x, y) <= raio;
        });
    }

    posicaoValida(x: number, y: number): boolean {
        return (
            x >= 0 &&
            y >= 0 &&
            x < this.largura &&
            y < this.altura
        );
    }

    estaOcupada(x: number, y: number): boolean {
        const personagemOcupando = this.entidades.some(entidade => entidade.getX() === x && entidade.getY() === y);
        const objetoBloqueando = this.objetos.some(objeto => objeto.getX() === x && objeto.getY() === y && objeto.getBloqueiaMovimento());

        return personagemOcupando || objetoBloqueando;
    }

    adicionarEfeitoArea(efeito: EfeitoArea): void {
        this.efeitosArea.push(efeito);
    }

    getEfeitosArea(): EfeitoArea[] {
        return this.efeitosArea;
    }

    processarEfeitosArea(): void {
        for (const efeito of this.efeitosArea) {
            for (const criatura of this.getEntidades()) {
                if (efeito.estaDentro(criatura)) {
                    efeito.afetar(criatura);
                }
            }

            efeito.reduzirDuracao();
        }
        this.efeitosArea = this.efeitosArea.filter(efeito => !efeito.expirou());
    }

    possuiLinhaDeVisao(origem: Personagem, alvo: Personagem): boolean {
        const x1 = origem.getX();
        const y1 = origem.getY();

        const x2 = alvo.getX();
        const y2 = alvo.getY();

        for (const objeto of this.objetos) {
            if (!objeto.getBloqueiaVisao()) {
                continue;
            }

            if (objeto.getX() >= Math.min(x1, x2) && objeto.getX() <= Math.max(x1, x2) && objeto.getY() >= Math.min(y1, y2) && objeto.getY() <= Math.max(y1, y2)) {
                return false;
            }
        }
        return true;
    }

    adicionarSala(sala: Sala): void {
        this.salas.push(sala);
    }

    getSalaDaEntidade(entidade: Personagem): Sala | null {
        for (const sala of this.salas) {
            if (sala.contem(entidade.getX(), entidade.getY())) {
                return sala;
            }
        }
        return null;
    }

    adicionarObjeto(objeto: Objeto): void {
        this.objetos.push(objeto);
    }

    getObjetos(): Objeto[] {
        return this.objetos;
    }

    getObjetoEm(x: number, y: number): Objeto | undefined {
        return this.objetos.find(o => o.getX() === x && o.getY() === y);
    }

    limparObjetos(): void {
        this.objetos = [];
    }

    limparEntidades(): void {
        this.entidades = [];
    }

    limparSalas(): void {
        this.salas = [];
    }

    renderizar(): void {
        const larguraVisivel = 20;
        const alturaVisivel = 15;

        const jogador = this.entidades.find(e => e instanceof Jogador);

        let cameraX = 0;
        let cameraY = 0;

        if (jogador) {
            const sala = this.getSalaDaEntidade(jogador);
            if (sala) {
                const totalQuadrosSalaX = sala.getLargura() + 1;
                const totalQuadrosSalaY = sala.getAltura() + 1;

                if (totalQuadrosSalaX < larguraVisivel) {
                    cameraX = sala.getXInicial() - Math.floor((larguraVisivel - totalQuadrosSalaX) / 2);
                } else {
                    cameraX = jogador.getX() - Math.floor(larguraVisivel / 2);
                    cameraX = Math.max(cameraX, sala.getXInicial());
                    cameraX = Math.min(cameraX, sala.getXInicial() + sala.getLargura() - larguraVisivel + 1);
                }

                if (totalQuadrosSalaY < alturaVisivel) {
                    cameraY = sala.getYInicial() - Math.floor((alturaVisivel - totalQuadrosSalaY) / 2);
                } else {
                    cameraY = jogador.getY() - Math.floor(alturaVisivel / 2);
                    cameraY = Math.max(cameraY, sala.getYInicial());
                    cameraY = Math.min(cameraY, sala.getYInicial() + sala.getAltura() - alturaVisivel + 1);
                }
            } else {
                cameraX = jogador.getX() - Math.floor(larguraVisivel / 2);
                cameraY = jogador.getY() - Math.floor(alturaVisivel / 2);
            }
        }

        console.log("\n=== MAPA ===");

        let cabecalho = "   ";

        for (let vx = 0; vx < larguraVisivel; vx++) {
            const absX = cameraX + vx;
            if (absX < 0 || absX >= this.largura) {
                cabecalho += "   ";
            } else {
                cabecalho += absX.toString().padStart(2, " ") + " ";
            }
        }

        console.log(cabecalho);

        for (let vy = 0; vy < alturaVisivel; vy++) {
            const absY = cameraY + vy;
            let linha = "";

            if (absY < 0 || absY >= this.altura) {
                linha += "   ";
            } else {
                linha += absY.toString().padStart(2, " ") + " ";
            }

            for (let vx = 0; vx < larguraVisivel; vx++) {
                const absX = cameraX + vx;

                if (absX < 0 || absY < 0 || absX >= this.largura || absY >= this.altura) {
                    linha += "   ";
                    continue;
                }

                const salaDoJogador = jogador ? this.getSalaDaEntidade(jogador) : null;

                if (salaDoJogador) {
                    if (!salaDoJogador.contem(absX, absY)) {
                        linha += "   ";
                        continue;
                    }

                    const naBordaX = absX === salaDoJogador.getXInicial() || absX === salaDoJogador.getXInicial() + salaDoJogador.getLargura();
                    const naBordaY = absY === salaDoJogador.getYInicial() || absY === salaDoJogador.getYInicial() + salaDoJogador.getAltura();

                    if (naBordaX || naBordaY) {
                        linha += "#  ";
                        continue;
                    }
                }
                const entidade = this.entidades.find(e => e.getX() === absX && e.getY() === absY);
                if (entidade) {
                    linha += (entidade instanceof Jogador ? "J  " : "I  ");
                    continue;
                }

                const objeto = this.objetos.find(o => o.getX() === absX && o.getY() === absY);
                if (objeto) {
                    linha += "O  ";
                    continue;
                }

                linha += ".  ";
            }
            console.log(linha);
        }

        console.log("\nLegenda:");
        console.log("J = Jogador | I = Inimigo | O = Obstáculo");
        console.log(". = Espaço livre | # = Parede da Sala");
    }
}
