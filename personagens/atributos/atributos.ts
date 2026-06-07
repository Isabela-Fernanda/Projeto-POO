

export abstract class Raca {
    constructor(
        protected nome: string
    ) { }

    getNome(): string {
        return this.nome;
    }

    abstract aplicarBonus(
        atributos: Atributos
    ): void;
}
