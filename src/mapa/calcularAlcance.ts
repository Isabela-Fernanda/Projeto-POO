import { AlcanceMagia } from "../poderes/magia/magia.ts";

export class CalcularAlcance {
    static obter(alcace: AlcanceMagia): number {
        switch (alcace) {
            case AlcanceMagia.TOQUE:
                return 1.5;
            case AlcanceMagia.CURTO:
                return 9;
            case AlcanceMagia.MEDIO:
                return 30;
            case AlcanceMagia.LONGO:
                return 90;
            default:
                return Infinity;
        }
        
    }
}