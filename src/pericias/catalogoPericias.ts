import { TipoAtributo } from "../personagens/atributos/atributos.ts";
import { Pericia } from "./pericia.ts";

export class CatalogoPericias {
    static readonly ACROBACIA = new Pericia("Acrobacia", TipoAtributo.DESTREZA);
    static readonly ADESTRAMENTO = new Pericia("Adestramento", TipoAtributo.CARISMA, true);
    static readonly ATLETISMO = new Pericia("Atletismo", TipoAtributo.FORCA);
    static readonly ATUACAO = new Pericia("Atuação", TipoAtributo.CARISMA);
    static readonly CAVALGAR = new Pericia("Cavalgar", TipoAtributo.DESTREZA);
    static readonly CONHECIMENTO = new Pericia("Conhecimento", TipoAtributo.INTELIGENCIA, true);
    static readonly CURA = new Pericia("Cura", TipoAtributo.SABEDORIA);
    static readonly DIPLOMACIA = new Pericia("Diplomacia", TipoAtributo.CARISMA);
    static readonly ENGANACAO = new Pericia("Enganação", TipoAtributo.CARISMA);
    static readonly FORTITUDE = new Pericia("Fortitude", TipoAtributo.CONSTITUICAO);
    static readonly FURTIVIDADE = new Pericia("Furtividade", TipoAtributo.DESTREZA);
    static readonly GUERRA = new Pericia("Guerra", TipoAtributo.INTELIGENCIA, true);
    static readonly INICIATIVA = new Pericia("Iniciativa", TipoAtributo.DESTREZA);
    static readonly INTIMIDACAO = new Pericia("Intimidação", TipoAtributo.CARISMA);
    static readonly INTUICAO = new Pericia("Intuição", TipoAtributo.SABEDORIA);
    static readonly INVESTIGACAO = new Pericia("Investigação", TipoAtributo.INTELIGENCIA);
    static readonly JOGATINA = new Pericia("Jogatina", TipoAtributo.CARISMA, true);
    static readonly LADINAGEM = new Pericia("Ladinagem", TipoAtributo.DESTREZA, true);
    static readonly LUTA = new Pericia("Luta", TipoAtributo.FORCA);
    static readonly MISTICISMO = new Pericia("Misticismo", TipoAtributo.INTELIGENCIA, true);
    static readonly NOBREZA = new Pericia("Nobreza", TipoAtributo.INTELIGENCIA, true);
    static readonly OFICIO = new Pericia("Ofício", TipoAtributo.INTELIGENCIA, true);
    static readonly PERCEPCAO = new Pericia("Percepção", TipoAtributo.SABEDORIA);
    static readonly PILOTAGEM = new Pericia("Pilotagem", TipoAtributo.DESTREZA, true);
    static readonly PONTARIA = new Pericia("Pontaria", TipoAtributo.DESTREZA);
    static readonly REFLEXOS = new Pericia("Reflexos", TipoAtributo.DESTREZA);
    static readonly RELIGIAO = new Pericia("Religião", TipoAtributo.SABEDORIA, true);
    static readonly SOBREVIVENCIA = new Pericia("Sobrevivêcia", TipoAtributo.SABEDORIA);
    static readonly VONTADE = new Pericia("Vontade", TipoAtributo.SABEDORIA);

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

    static escolherPericia(permitidas: Pericia[]): Pericia {
        while (true) {
            console.log("\nEscolha uma perícia:");

            permitidas.forEach(
                (pericia, indice) => {
                    console.log(`${indice + 1} - ${pericia.getNome()}`);
                }
            );

            const escolha = Number(prompt("Escolha:"));

            const pericia = permitidas[escolha - 1];

            if (pericia) {
                return pericia;
            }

            console.log("Escolha inválida.");
        }
    }

    
}