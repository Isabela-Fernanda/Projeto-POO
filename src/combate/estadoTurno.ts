export class EstadoTurno {
    private acaoPadraoDisponivel = true;
    private acaoMovimentoDisponivel = true;
    private acoesMovimentoExtras = 0;

    adicionarAcaoMovimentoExtra(): void {
        this.acoesMovimentoExtras++;
    }

    usarAcaoPadrao(): boolean {
        if (this.acaoPadraoDisponivel) {
            this.acaoPadraoDisponivel = false;
            return true;
        }

        if(this.acoesMovimentoExtras > 0){
            this.acoesMovimentoExtras--;
            return true;
        }

        return false;
    }

    usarAcaoMovimento(): boolean {
        if (!this.acaoMovimentoDisponivel) {
            return false;
        }

        this.acaoMovimentoDisponivel = false;
        return true;
    }

    converterPadraoEmMovimento(): boolean {
        if (!this.acaoPadraoDisponivel) {
            return false;
        }

        this.acaoPadraoDisponivel = false;
        this.acaoMovimentoDisponivel = true;

        return true;
    }

    possuiAcaoPadrao(): boolean {
        return this.acaoPadraoDisponivel;
    }

    possuiAcaoMovimento(): boolean {
        return this.acaoMovimentoDisponivel || this.acoesMovimentoExtras > 0;
    }
}