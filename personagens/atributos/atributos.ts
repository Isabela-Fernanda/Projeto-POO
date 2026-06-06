export class Atributos {
    constructor(
        public forca: number,
        public destreza: number,
        public constituicao: number,
        public inteligencia: number,
        public sabedoria: number,
        public carisma: number
    ){}

    getForca(): number {
        return this.forca;
    }
    getDestreza(): number {
        return this.destreza;
    }
    getConstituicao(): number {
        return this.constituicao;
    }
    getInteligencia(): number {
        return this.inteligencia;
    }
    getSabedoria(): number {
        return this.sabedoria;
    }
    getCarisma(): number {
        return this.carisma;
    }
}