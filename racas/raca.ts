export abstract class Raca {
    constructor(
        protected nome: string,
        protected bonusForca: number,
        protected bonusDestreza: number,
        protected bonusConstituicao: number,
        protected bonusInteligencia: number,
        protected bonusSabedoria: number,
        protected bonusCarisma: number
    ) {}

    getNome(): string {
        return this.nome;
    }
}