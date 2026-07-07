export class RegistroPersonagem {
    nome!: string;
    raca!: string;
    classe!: string;
    nivel!: number;
    ouro!: number;
    monstrosMortos!: number;

    tempoJogado!: number;
    causaMorte?: string;

    venceu = false;

    /* static criar(personagem: Jogador): RegistroPersonagem { } */
}