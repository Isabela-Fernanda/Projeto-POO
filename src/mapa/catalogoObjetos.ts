import { Objeto } from "./objeto.js";
import { Item } from "../itens/item.js";
import { Jogador } from "../personagens/tiposPersonagem/jogador.js";
import { Inventario } from "../inventario/inventario.js";
import { ResultadoObjeto } from "./resultadoInteracao.js";

export class Mesa extends Objeto {
    private itens: Item[];

    constructor(x: number, y: number, itens: Item[]) {
        super("Mesa", x, y, true, false);
        this.itens = itens;
    }

    coletar(jogador: Jogador): void {
        for (const item of this.itens) {
            jogador.getInventario().adicionar(item);
        }

        this.itens = [];

        console.log("Você pegou os itens da mesa.");
    }

    interagir(jogador: Jogador): ResultadoObjeto {
        if (this.itens.length === 0) {
            return new ResultadoObjeto(ResultadoInteracao.NENHUM, ["Não há nada aqui."]);
        }
        
        const mensagens: string[] = [];
        mensagens.push("Você pegou os itens da mesa.");

        for (const item of this.itens) {
            jogador.getInventario().adicionar(item);
            mensagens.push(`${item.getNome()} obtido.`);
        }

        this.itens = [];

        return new ResultadoObjeto(ResultadoInteracao.NENHUM, mensagens);
    }
}

export class Bau extends Objeto {
    private itens: Item[];

    constructor(x: number, y: number, itens: Item[]) {
        super("Baú", x, y, true, false);
        this.itens = itens;
    }

    abrir(jogador: Jogador): void {
        for (const item of this.itens) {
            jogador.getInventario().adicionar(item);
        }

        this.itens = [];

        console.log("Você abriu o baú e pegou os itens.");
    }

    interagir(jogador: Jogador): ResultadoObjeto {
        if (this.itens.length == 0) {
            return new ResultadoObjeto(ResultadoInteracao.NENHUM, ["O baú está vazio."]);
        }

        const mensagens: string[] = [];
        mensagens.push("Você abriu o baú.");

        for (const item of this.itens) {
            jogador.getInventario().adicionar(item);
            mensagens.push(`${item.getNome()} obtido.`);
        }

        this.itens = [];

        return new ResultadoObjeto(ResultadoInteracao.NENHUM, mensagens);
    }
}

export class Estante extends Objeto {
    private itens: Item[];

    constructor(x: number, y: number, itens: Item[]) {
        super("Estante", x, y, true, true);
        this.itens = itens;
    }

    coletar(jogador: Jogador): void {
        for (const item of this.itens) {
            jogador.getInventario().adicionar(item);
        }

        this.itens = [];

        console.log("Você pegou os itens da estante.");
    }

    interagir(jogador: Jogador): ResultadoObjeto {
        if (this.itens.length === 0) {
            return new ResultadoObjeto(ResultadoInteracao.NENHUM, ["Não há nada aqui."]);
        }

        const mensagens: string[] = [];
        mensagens.push("Você pegou os itens da estante.");

        for (const item of this.itens) {
            jogador.getInventario().adicionar(item);
            mensagens.push(`${item.getNome()} obtido.`);
        }

        this.itens = [];

        return new ResultadoObjeto(ResultadoInteracao.NENHUM, mensagens);
    }
}

export enum ResultadoInteracao {
    NENHUM,
    ENTRAR_MASMORRA,
    FIM_DE_JOGO,
}

export class Portal extends Objeto {
    private ativo: boolean;

    constructor(
        nome: string,
        x: number,
        y: number,
        private resultado: ResultadoInteracao,
        ativo: boolean = true,
    ) {
        super(nome, x, y, false, false);
        this.ativo = ativo;
    }

    ativar(): void {
        this.ativo = true;
    }

    desativar(): void {
        this.ativo = false;
    }

    estaAtivo(): boolean {
        return this.ativo;
    }

    interagir(jogador: Jogador): ResultadoObjeto {
        if (!this.ativo) {
            return new ResultadoObjeto(ResultadoInteracao.NENHUM, ["O portal está inativo."]);
        }

        return new ResultadoObjeto(ResultadoInteracao.ENTRAR_MASMORRA, ["Você atravessa o portal."]);
    }
}

export class Espolio extends Objeto {
    constructor(
        x: number,
        y: number,
        private inventario: Inventario
    ) {
        super("Espólio", x, y, false, false);
    }

    getInventario(): Inventario {
        return this.inventario;
    }

    possuiItens(): boolean {
        return !this.inventario.estaVazio();
    }

    interagir(jogador: Jogador): ResultadoObjeto {
        if (!this.possuiItens()) {
            return new ResultadoObjeto(ResultadoInteracao.NENHUM, ["Não há nada aqui."]);
        }

        const mensagens: string[] = [];
        mensagens.push("Você recolheu o espólio.");

        for (const item of this.inventario.getItens()) {
            jogador.getInventario().adicionar(item.item);
            mensagens.push(`${item.item.getNome()} obtido.`);
        }

        this.inventario.limpar();
        return new ResultadoObjeto(ResultadoInteracao.NENHUM, mensagens);
    }
}


