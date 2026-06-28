import { Personagem } from "../personagens/personagem.ts";
import { FacilidadeUso } from "../inventario/equipamento.ts";
import { AcaoItem, Item, Modificacoes } from "./item.ts"

export enum CategoriaArmadura {
    LEVE,
    PESADA
}

export enum TipoProtecao {
    ARMADURA,
    ESCUDO
}

export class Armadura extends Item {
    constructor(
        nome: string,
        preco: number,
        peso: number,
        descricao: string = "",
        private bonusDefesa: number,
        private categoria: CategoriaArmadura,
        private facilidade: FacilidadeUso,
        private tipo: TipoProtecao,
        private penalidade: number,
        modificacoes: Modificacoes[] = [],
    ) {
        super(nome, preco, peso, descricao, modificacoes);
    }

    override podeEmpilhar(): boolean {
        return false;
    }

    getAcoes(personagem: Personagem): AcaoItem[] {
        return [
            {
                nome: "Equipar",
                executar: () => personagem.equiparProtecao(this)
            },
            this.acaoExaminar(),
            this.acaoSoltar(personagem)
        ];
    }

    getBonusDefesa(): number {
        return this.bonusDefesa;
    }

    getCategoria(): CategoriaArmadura {
        return this.categoria;
    }

    getFacilidade(): FacilidadeUso {
        return this.facilidade;
    }

    getTipo(): TipoProtecao {
        return this.tipo;
    }

    getPenalidade(): number {
        return this.penalidade;
    }
}