import { Objeto } from "./objeto.ts";
import { Item } from "../itens/item.ts";
import { Jogador } from "../personagens/tiposPersonagem/jogador.ts";
import { Inventario } from "../inventario/inventario.ts";

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

    interagir(jogador: Jogador): ResultadoInteracao {
        if (this.itens.length === 0) {
            console.log("Não há nada aqui.");
            return ResultadoInteracao.NENHUM;;
        }
        this.coletar(jogador);
        return ResultadoInteracao.NENHUM;
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

    interagir(jogador: Jogador): ResultadoInteracao {
        if (this.itens.length === 0) {
            console.log("Não há nada aqui.");
            return ResultadoInteracao.NENHUM;;
        }
        this.abrir(jogador);
        return ResultadoInteracao.NENHUM;
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

    interagir(jogador: Jogador): ResultadoInteracao {
        if (this.itens.length === 0) {
            console.log("Não há nada aqui.");
            return ResultadoInteracao.NENHUM;;
        }
        this.coletar(jogador);
        return ResultadoInteracao.NENHUM;
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

    interagir(jogador: Jogador): ResultadoInteracao {
        if (!this.ativo) {
            console.log(`O ${this.nome} está inativo.`);
            return ResultadoInteracao.NENHUM;
        }

        return this.resultado;
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

    interagir(jogador: Jogador): ResultadoInteracao {
        if(!this.possuiItens()) {
            console.log("Isso não deveria aparecer.")
            return ResultadoInteracao.NENHUM;
        }
        
        for (const item of this.inventario.getItens()) {
            jogador.getInventario().adicionar(item.item);
        }

        this.inventario.limpar();

        console.log("Você recolheu o espólio.");

        return ResultadoInteracao.NENHUM;
    }
}


