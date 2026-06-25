export enum TipoAmbiente {
    NORMAL,
    SUBTERRANEO,
    FLORESTA,
    URBANO,
    DESERTO,
}

export enum Luminosidade {
    ILUMINADO,
    PENUMBRA,
    ESCURO,
}

export enum EstadoPorta {
    ABERTA,
    FECHADA,
    TRANCADA
}

export class ConexaoSala {
    constructor(
        private origem: Sala,
        private destino: Sala,
        private x: number,
        private y: number,
        private largura: number = 1,
        private altura: number = 1
    ) { }

    getOrigem(): Sala {
        return this.origem;
    }

    getDestino(): Sala {
        return this.destino;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getLargura(): number {
        return this.largura;
    }

    getAltura(): number {
        return this.altura;
    }

    contem(x: number, y: number): boolean {
        return (
            x >= this.x &&
            x < this.x + this.largura &&
            y >= this.y &&
            y < this.y + this.altura
        );
    }
}

export class Porta {
    public salaOrigem: Sala;
    public salaDestino: Sala;
    public x: number;
    public y: number;
    public estado: EstadoPorta;
    public ehPassagem: boolean;

    constructor(
        salaOrigem: Sala, 
        salaDestino: Sala, 
        x: number, 
        y: number, 
        ehPassagem = false
    ) {
        this.salaOrigem = salaOrigem;
        this.salaDestino = salaDestino;
        this.x = x;
        this.y = y;
        this.ehPassagem = ehPassagem;
        this.estado = ehPassagem ? EstadoPorta.ABERTA : EstadoPorta.FECHADA;
    }

    getSimbolo(): string {
        if (this.ehPassagem) {
            return " ";
        }
        
        switch (this.estado) {
            case EstadoPorta.ABERTA:
                return "/"; // Porta aberta inclinada
            case EstadoPorta.FECHADA:
                return "+"; // Porta fechada clássica de Roguelikes
            case EstadoPorta.TRANCADA:
                return "X"; // Sinaliza bloqueio absoluto
        }
    }

    interagir(temChave: boolean): string {
        if (this.ehPassagem) return "É apenas uma passagem aberta.";
        if (this.estado === EstadoPorta.TRANCADA) {
            if (temChave) {
                this.estado = EstadoPorta.FECHADA;
                return "Destrancaste a porta com a chave!";
            }
            return "A porta está trancada firmemente. Precisas de uma chave.";
        }

        if (this.estado === EstadoPorta.FECHADA) {
            this.estado = EstadoPorta.ABERTA;
            return "Abriste a porta.";
        } else {
            this.estado = EstadoPorta.FECHADA;
            return "Fechaste a porta.";
        }
    }
}

export class Sala {
    constructor(
        private nome: string,
        private tipoAmbiente: TipoAmbiente,
        private iluminacao: Luminosidade,
        private xInicial: number,
        private yInicial: number,
        private largura: number,
        private altura: number,
        private conexoes: ConexaoSala[] = [],
    ) { }

    getNome(): string {
        return this.nome;
    }

    getTipoAmbiente(): TipoAmbiente {
        return this.tipoAmbiente;
    }

    ehSubterraneo(): boolean {
        return this.tipoAmbiente === TipoAmbiente.SUBTERRANEO;
    }

    getIluminacaoAmbiente(): Luminosidade {
        return this.iluminacao;
    }

    getXInicial(): number {
        return this.xInicial;
    }

    getYInicial(): number {
        return this.yInicial;
    }

    getLargura(): number {
        return this.largura;
    }

    getAltura(): number {
        return this.altura;
    }

    contem(x: number, y: number): boolean {
        return (
            x >= this.xInicial &&
            x < this.xInicial + this.largura &&
            y >= this.yInicial &&
            y < this.yInicial + this.altura
        );
    }

    getConexoes(): ConexaoSala[] {
        return this.conexoes;
    }

    adicionarConexao(conexao: ConexaoSala): void {
        this.conexoes.push(conexao);
    }
}