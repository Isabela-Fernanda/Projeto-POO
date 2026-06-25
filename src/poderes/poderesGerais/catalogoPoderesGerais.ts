import { Habilidade } from "../habilidades.ts";
import { AcuidadeComArma, AtaquePoderoso, CombateDefensivo, Esquiva, FocoEmArma, ReflexosDeCombate, SaqueRapido, Vitalidade, VontadeDeFerro } from "./PoderGeral.ts";

export interface OpcaoPoder {
    nome: string;
    criar(): Habilidade;
}

export class CatalogoPoderesGerais {
    static readonly PODERES: OpcaoPoder[] = [
        { nome: "Acuidade com Arma", criar: () => new AcuidadeComArma() },
        { nome: "Ataque Poderoso", criar: () => new AtaquePoderoso() },
        { nome: "Combate Defensivo", criar: () => new CombateDefensivo() },
        { nome: "Esquiva", criar: () => new Esquiva() },
        {
            nome: "Foco em Arma", criar: () => {
                const arma = prompt("Escolha a arma:");
                return new FocoEmArma(arma ?? "");
            }
        },
        { nome: "Reflexos de Combate", criar: () => new ReflexosDeCombate() },
        { nome: "Saque Rápido", criar: () => new SaqueRapido() },
        { nome: "Vitalidade", criar: () => new Vitalidade() },
        { nome: "Vontade de Ferro", criar: () => new VontadeDeFerro() },
    ];
}
