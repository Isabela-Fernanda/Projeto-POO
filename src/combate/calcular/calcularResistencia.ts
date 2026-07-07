import { Personagem } from "../../personagens/personagem.js";
import { ResultadoTeste } from "../resultados/resultadoTeste.js";
import { TestePericia } from "../testes/testePericia.js";
import { TipoDano } from "../tipoDano.js";
import { CatalogoPericias } from "../../pericias/catalogoPericias.js";

export class CalcularResistencia {
    static executarCalculo(personagem: Personagem, tipoDano: TipoDano, cd: number): ResultadoTeste {
        const bonusEfeito = personagem.somarBonusEfeitos(e => e.getBonusResistencia())
        switch (tipoDano) {
            case TipoDano.ACIDO:
            case TipoDano.ELETRICIDADE:
            case TipoDano.FOGO:
            case TipoDano.FRIO:
            case TipoDano.LUZ:
            case TipoDano.RESTRICAO:
            case TipoDano.TREVAS:
                return TestePericia.executar(personagem, CatalogoPericias.REFLEXOS, cd, bonusEfeito);
            case TipoDano.CORTE:
            case TipoDano.ESSENCIA:
            case TipoDano.IMPACTO:
            case TipoDano.PERFURACAO:
            case TipoDano.VENENO:
                return TestePericia.executar(personagem, CatalogoPericias.FORTITUDE, cd, bonusEfeito);
            case TipoDano.MENTAL:
                return TestePericia.executar(personagem, CatalogoPericias.VONTADE, cd, bonusEfeito);
            case TipoDano.EQUILIBRIO:
                return TestePericia.executar(personagem, CatalogoPericias.ACROBACIA, cd, bonusEfeito);
            default:
                throw new Error(`Tipo de dano não suportado: ${tipoDano}`)
        }
    }
}