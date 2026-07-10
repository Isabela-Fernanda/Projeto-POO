import { ResultadoInteracao } from "./catalogoObjetos.js";

export class ResultadoObjeto {
    constructor(
        public readonly resultado: ResultadoInteracao,
        public readonly mensagens: string[] = []
    ) {}

}