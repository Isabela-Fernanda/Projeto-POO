export class Atributos {
    constructor(
        public forca: number,
        public destreza: number,
        public constituicao: number,
        public inteligencia: number,
        public sabedoria: number,
        public carisma: number
    ){}

    calcularForca(bonusRacial: number): number{
        return this.forca + bonusRacial;
    }
    calcularDestreza(bonusRacial: number): number {
        return this.destreza + bonusRacial;
    }
    calcularConstituicao(bonusRacial: number): number {
        return this.constituicao + bonusRacial;
    }
    calcularInteligencia(bonusRacial: number): number {
        return this.inteligencia + bonusRacial;
    }
    calcularSabedoria(bonusRacial: number): number {
        return this.sabedoria + bonusRacial;
    }
    calcularCarisma(bonusRacial: number): number {
        return this.carisma + bonusRacial;
    }

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