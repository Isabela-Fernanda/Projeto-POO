import { Objeto } from "./objeto.ts";
import { Item } from "../inventario/itens/item.ts";
import { Jogador } from "../personagens/jogador.ts";
import { Mapa } from "./mapa.ts";

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
    ENTRAR_MASMORRA
}

export class Portal extends Objeto {
    private ativo: boolean;

    constructor(
        nome: string,
        x: number,
        y: number,
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

        return ResultadoInteracao.ENTRAR_MASMORRA;
    }
}


