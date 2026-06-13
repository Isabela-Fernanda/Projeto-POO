export class ResultadoTeste {
    constructor(
        public readonly rolagem: number,
        public readonly total: number,
        public readonly sucesso: boolean,
    ) { }
}