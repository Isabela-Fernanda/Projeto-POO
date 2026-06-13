export class EstadoTurno {

    private acaoPadraoDisponivel = true;
    private acaoMovimentoDisponivel = true;

    usarAcaoPadrao(): boolean {
        if (!this.acaoPadraoDisponivel) {
            return false;
        }

        this.acaoPadraoDisponivel = false;
        return true;
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
        return this.acaoMovimentoDisponivel;
    }
}