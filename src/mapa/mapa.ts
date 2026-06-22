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

    estaOcupada(x: number, y: number): boolean {
        const personagemOcupando = this.entidades.some(entidade => entidade.getX() === x && entidade.getY() === y);

        const objetoBloqueando = this.objetos.some(objeto => objeto.getX() === x && objeto.getY() === y && objeto.getBloqueiaMovimento());

        if (personagemOcupando || objetoBloqueando) {
            return true;
        }

        return false;
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

        console.log("\n=== MAPA ===");

        let cabecalho = "   ";

        for (let x = 0; x < larguraVisivel; x++) {
            cabecalho += x.toString().padStart(2, " ") + " ";
        }

        console.log(cabecalho);

        for (let y = 0; y < alturaVisivel; y++) {
            let linha = y.toString().padStart(2, " ") + " ";

            for (let x = 0; x < larguraVisivel; x++) {
                const entidade = this.entidades.find(e => e.getX() === x && e.getY() === y);

                if (entidade) {
                    if (entidade instanceof Jogador) {
                        linha += "J  ";
                    } else {
                        linha += "I  ";
                    }
                    continue;
                }

                const objeto = this.objetos.find(o => o.getX() === x && o.getY() === y);
                if (objeto) {
                    linha += "#  ";
                    continue;
                }
                linha += ".  ";
            }
            console.log(linha);
        }

        console.log("\nLegenda:");
        console.log("J = Jogador");
        console.log("I = Inimigo");
        console.log("# = Obstáculo");
        console.log(". = Espaço livre");
    }
}
