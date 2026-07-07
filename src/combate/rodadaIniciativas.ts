import { Dado } from "./dado.js";
import { Personagem } from "../personagens/personagem.js";
import { CatalogoPericias } from "../pericias/catalogoPericias.js";
import { CalculadoraPericia } from "./calcular/calculadoraPericia.js";

export class RodadaIniciativa {
    static rolar(personagem: Personagem): number {
        const rolagem = Dado.d20();
        const bonus = CalculadoraPericia.calcular(personagem, CatalogoPericias.INICIATIVA) + personagem.getBonusIniciativa() + personagem.getBonusIniciativaHabilidades();

        return rolagem + bonus;
    }
}