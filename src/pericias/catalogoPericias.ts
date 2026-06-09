import { Pericia } from "./pericia.ts";

export class CatalogoPericias {
    static readonly ACROBACIA = new Pericia("Acrobacia");
    static readonly ADESTRAMENTO = new Pericia("Adestramento");
    static readonly ATLETISMO = new Pericia("Atletismo");
    static readonly ATUACAO = new Pericia("Atuação");
    static readonly CAVALGAR = new Pericia("Cavalgar");
    static readonly CONHECIMENTO = new Pericia("Conhecimento");
    static readonly CURA = new Pericia("Cura");
    static readonly DIPLOMACIA = new Pericia("Diplomacia");
    static readonly ENGANACAO = new Pericia("Enganação");
    static readonly FORTITUDE = new Pericia("Fortitude");
    static readonly FURTIVIDADE = new Pericia("Furtividade");
    static readonly GUERRA = new Pericia("Guerra");
    static readonly INICIATIVA = new Pericia("Iniciativa");
    static readonly INTIMIDACAO = new Pericia("Intimidação");
    static readonly INTUICAO = new Pericia("Intuição");
    static readonly INVESTIGACAO = new Pericia("Investigação");
    static readonly JOGATINA = new Pericia("Jogatina");
    static readonly LADINAGEM = new Pericia("Ladinagem");
    static readonly LUTA = new Pericia("Luta");
    static readonly MISTICISMO = new Pericia("Misticismo");
    static readonly NOBREZA = new Pericia("Nobreza");
    static readonly OFICIO = new Pericia("Ofício");
    static readonly PERCEPCAO = new Pericia("Percepção");
    static readonly PILOTAGEM = new Pericia("Pilotagem");
    static readonly PONTARIA = new Pericia("Pontaria");
    static readonly REFLEXOS = new Pericia("Reflexos");
    static readonly RELIGIAO = new Pericia("Religião");
    static readonly SOBREVIVENCIA = new Pericia("Sobrevivêcia");
    static readonly VONTADE = new Pericia("Vontade");

    static getTodas(): Pericia[] {
        return [
            this.ACROBACIA,
            this.ADESTRAMENTO,
            this.ATLETISMO,
            this.ATUACAO,
            this.CAVALGAR,
            this.CONHECIMENTO,
            this.CURA,
            this.DIPLOMACIA,
            this.ENGANACAO,
            this.FORTITUDE,
            this.FURTIVIDADE,
            this.GUERRA,
            this.INICIATIVA,
            this.INTIMIDACAO,
            this.INTUICAO,
            this.INVESTIGACAO,
            this.JOGATINA,
            this.LADINAGEM,
            this.LUTA,
            this.MISTICISMO,
            this.NOBREZA,
            this.OFICIO,
            this.PERCEPCAO,
            this.PILOTAGEM,
            this.PONTARIA,
            this.REFLEXOS,
            this.RELIGIAO,
            this.SOBREVIVENCIA,
            this.VONTADE
        ];
    }
}