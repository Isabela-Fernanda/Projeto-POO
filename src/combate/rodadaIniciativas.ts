import { Dado } from "./dado.ts";
import { Personagem } from "../personagens/personagem.ts";
import { CatalogoPericias } from "../pericias/catalogoPericias.ts";
import { CalculadoraPericia } from "./calcular/calculadoraPericia.ts";

export class RodadaIniciativa {
    static rolar(personagem: Personagem): number {
        const rolagem = Dado.d20();
        const bonus = CalculadoraPericia.calcular(personagem, CatalogoPericias.INICIATIVA) + personagem.getBonusIniciativa() + personagem.getBonusIniciativaHabilidades();

        return rolagem + bonus;
    }
}