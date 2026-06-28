import { Jogador } from "../personagens/tiposPersonagem/jogador.ts";
import { Personagem } from "../personagens/personagem.ts";
import { EfeitoArea } from "../poderes/efeitoArea.ts";
import { Objeto } from "./objeto.ts";
import { Sala } from "./sala.ts";
import { Conexao } from "./conexao.ts";
import { Espolio } from "./catalogoObjetos.ts";
import { Inventario } from "../inventario/inventario.ts";
import { Item } from "../itens/item.ts";

import { TileMapa } from "./tileMapa.ts";

export class Mapa {
    private entidades: Personagem[] = [];
    private efeitosArea: EfeitoArea[] = [];
    private objetos: Objeto[] = [];
    private salas: Sala[] = [];
    private conexoes: Conexao[] = [];

    private largura = 100;
    private altura = 100;

    calcularDistancia(x1: number, y1: number, x2: number, y2: number): number {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    adicionarEntidade(entidade: Personagem): void {
        if (this.entidades.includes(entidade)) {
            return;
        }
        this.entidades.push(entidade);
    }

    removerEntidade(entidade: Personagem): void {
        this.entidades = this.entidades.filter(e => e !== entidade);
    }

    posicionarEntidade(entidade: Personagem, x: number, y: number): boolean {
        if (!this.posicaoValida(x, y)) return false;
        if (this.estaOcupada(x, y)) return false;

        entidade.setPosicao(x, y);

        const sala = this.encontrarSala(x, y);
        if(sala) entidade.setSalaAtual(sala);

        this.adicionarEntidade(entidade);

        return true;
    }

    getEntidades(): Personagem[] {
        return this.entidades;
    }

    getEntidadesDaSala(sala: Sala): Personagem[] {
        return this.entidades.filter(entidade => entidade.getSalaAtual() === sala);
    }

    getEntidadePorNome(nome: string): Personagem | undefined {
        return this.entidades.find(entidade => entidade.getNome() === nome);
    }

    moverEntidade(entidade: Personagem, destinoX: number, destinoY: number): boolean {
        if (!this.posicaoValida(destinoX, destinoY)) return false;
        if (this.estaOcupada(destinoX, destinoY)) return false;

        const tile = this.getTile(destinoX, destinoY);

        const conexao = this.getConexao(destinoX, destinoY);
        if (conexao) {
            if (!conexao.podeAtravessar(entidade))
                return false;
        } else if (tile === TileMapa.PAREDE || tile === TileMapa.VAZIO) {
            return false;
        }

        const dx = destinoX - entidade.getX();
        const dy = destinoY - entidade.getY();
        const distancia = Math.sqrt(dx * dx + dy * dy);

        if (distancia > entidade.getDeslocamento()) {
            return false;
        }

        entidade.setPosicao(destinoX, destinoY);

        const novaSala = this.encontrarSala(destinoX, destinoY);
        if (novaSala) {
            entidade.setSalaAtual(novaSala);

            if (entidade instanceof Jogador) novaSala.descobrir();
        }

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

    adicionarEfeitoArea(efeito: EfeitoArea): void { this.efeitosArea.push(efeito); }

    getEfeitosArea(): EfeitoArea[] { return this.efeitosArea; }

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

    getSalaPorPosicao(x: number, y: number): Sala | null {
        for (const sala of this.salas) {
            if (sala.contem(x, y)) {
                return sala;
            }
        }
        return null;
    }

    adicionarSala(sala: Sala): void { this.salas.push(sala); }

    adicionarConexao(conexao: Conexao): void {
        this.conexoes.push(conexao);
    }

    getConexao(x: number, y: number) {
        return this.conexoes.find(c => c.contem(x, y));
    }

    getConexoes() {
        return this.conexoes;
    }

    adicionarObjeto(objeto: Objeto): void { this.objetos.push(objeto); }

    getObjetos(): Objeto[] { return this.objetos; }

    getObjetoEm(x: number, y: number): Objeto | undefined { return this.objetos.find(o => o.getX() === x && o.getY() === y); }

    criarEspolio(x: number, y: number, itens: Item[]): void {
        if (itens.length === 0) {
            return;
        }

        const inventario = new Inventario();

        for (const item of itens) {
            inventario.adicionar(item);
        }

        this.adicionarObjeto(new Espolio(x, y, inventario));
    }

    removerObjeto(objeto: Objeto): void {
        this.objetos = this.objetos.filter(o => o !== objeto);
    }

    limparObjetos(): void { this.objetos = []; }

    limparEntidades(): void { this.entidades = []; }

    limparSalas(): void { this.salas = []; }

    private getTile(x: number, y: number): TileMapa {
        // existe alguma conexão?
        const conexao = this.getConexao(x, y);

        if (conexao) {
            return conexao.getTipo();
        }

        // existe alguma sala?
        const sala = this.getSalaPorPosicao(x, y);

        if (!sala)
            return TileMapa.VAZIO;

        const naBorda =
            x === sala.getX() ||
            x === sala.getX() + sala.getLargura() - 1 ||
            y === sala.getY() ||
            y === sala.getY() + sala.getAltura() - 1;

        if (naBorda)
            return TileMapa.PAREDE;

        return TileMapa.CHAO;
    }

    private desenharTile(x: number, y: number): string {
        const tile = this.getTile(x, y);

        switch (tile) {
            case TileMapa.VAZIO: return " ";
            case TileMapa.CHAO: return ".";
            case TileMapa.PAREDE: return "#";
            case TileMapa.PASSAGEM: return ".";
            case TileMapa.PORTA: {
                const porta = this.getConexao(x, y);
                if(!porta) return "+";
                if(!porta.deveDesenhar(x, y)) return ".";
                return porta?.getSimbolo() ?? "+";
            }
        }
    }

    private podeVer(x: number, y: number, personagem: Personagem) {
        const sala = this.getSalaPorPosicao(x, y);
        if (!sala) return false;

        const salaJogador = personagem.getSalaAtual();
        if (sala == salaJogador) return true;

        return sala.foiDescoberta();
    }

    private encontrarSala(x: number, y: number): Sala | null {
        return this.salas.find(s => s.contem(x, y)) ?? null;
    }

    renderizar(): void {
        const larguraVisivel = 20;
        const alturaVisivel = 15;

        const jogador = this.entidades.find(e => e instanceof Jogador);
        if (!jogador) {
            console.log("Nenhum jogador encontrado.");
            return;
        }

        let cameraX = 0;
        let cameraY = 0;

        if (jogador) {
            const sala = jogador.getSalaAtual();
            if (sala) {
                const totalQuadrosSalaX = sala.getLargura() + 1;
                const totalQuadrosSalaY = sala.getAltura() + 1;

                if (totalQuadrosSalaX < larguraVisivel) {
                    cameraX = sala.getX() - Math.floor((larguraVisivel - totalQuadrosSalaX) / 2);
                } else {
                    cameraX = jogador.getX() - Math.floor(larguraVisivel / 2);
                    cameraX = Math.max(cameraX, sala.getX());
                    cameraX = Math.min(cameraX, sala.getX() + sala.getLargura() - larguraVisivel + 1);
                }

                if (totalQuadrosSalaY < alturaVisivel) {
                    cameraY = sala.getY() - Math.floor((alturaVisivel - totalQuadrosSalaY) / 2);
                } else {
                    cameraY = jogador.getY() - Math.floor(alturaVisivel / 2);
                    cameraY = Math.max(cameraY, sala.getY());
                    cameraY = Math.min(cameraY, sala.getY() + sala.getAltura() - alturaVisivel + 1);
                }
            } else {
                cameraX = jogador.getX() - Math.floor(larguraVisivel / 2);
                cameraY = Math.floor(larguraVisivel / 2);
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

                if (!this.podeVer(absX, absY, jogador)) {
                    linha += "   ";
                    continue;
                }

                const entidade = this.entidades.find(e => e.getX() === absX && e.getY() === absY);
                if (entidade) {
                    linha += (entidade instanceof Jogador ? "J  " : "I  ");
                    continue;
                }

                const espolio = this.objetos.find(o => o instanceof Espolio && o.getX() === absX && o.getY() === absY);
                if (espolio) {
                    linha += "$  ";
                    continue;
                }

                const objeto = this.objetos.find(o => o.getX() === absX && o.getY() === absY);
                if (objeto) {
                    linha += "O  ";
                    continue;
                }

                linha += this.desenharTile(absX, absY) + "  ";
            }
            console.log(linha);
        }

        console.log("\nLegenda:");
        console.log("J = Jogador | I = Inimigo | $ = Espólio | O = Obstáculo | + = Porta Fechada | / = Porta Aberta | X = Porta Trancada");
        console.log(". = Espaço livre / Passagem | # = Parede da Sala");
    }
}