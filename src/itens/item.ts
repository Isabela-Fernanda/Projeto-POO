export abstract class Item {
    constructor(
        protected nome: string,
        protected peso: number,
    ) {}

    getNome(): string {
        return this.nome;
    }
}