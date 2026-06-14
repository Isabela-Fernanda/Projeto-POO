export enum Modificacoes {
    //ARMAS
    CERTEIRA, //+1 teste ataque
    PUNGENTE, //+2 teste ataque
    CRUEL, //+1 rolagem dano
    ATROZ, //+2 rolagem dano
    EQUILIBRADA, //+1 teste manobras
    PRECISA, //+1 margem de ameaça
    MACICA, //+1 multiplicador crítico
    MIRA_TELESCÓPICA, //Aumenta alcance da arma
    INJECA0_ALQUIMICA, //Gera efeito de item alquímico
    HARMONIZADA, //Custo de habilidade de ataque diminui -1PM

    //ARMADURAS
    AJUSTADA, //-1 na penalidade de armadura
    SOB_MEDIDA, //-2 na penalidade de armadura
    REFORCADA, //+1 na Defesa, +1 na penalidade de armadura
    SELADA, //+1 nos testes de resistência
    DELICADA, //aplica 1 ponto de DES na Defesa
    POLIDA, //+2 na Defesa na primeira rodada
    ARMADURA_ESPINHOSA, //causa dano com agarrar
    ESCUDO_ESPINHOSO, //aumenta dano do escudo

    //OUTRAS
    APRIMORADO, //+2 3m testes de pericia
    BANHADO_A_OURO, //+2 em Diplomacia
    CRAVEJADO_DE_GEMAS, //+2 em Enganação
    MACABRO, //+2 em Intimidação, -2 em Diplomacia

    //MATERIAIS ESPECIAIS
    ACO_RUBI,
    ADAMANTE,
    GELO_ETERNO,
    MADEIRA_TOLLON,
    MATERIA_VERMELHA,
    MITRAL 
}

export class Item {
    constructor(
        protected nome: string,
        protected preco: number,
        protected peso: number,
        protected descricao: string,
        protected modificacoes: Modificacoes[] = [],
    ) {}

    getNome(): string {
        return this.nome;
    }

    getPeso(): number{
        return this.peso;
    }

    getDescricao(): string{
        return this.descricao;
    }

    getMultiplicadores(): Modificacoes[] {
        return this.modificacoes;
    }
}