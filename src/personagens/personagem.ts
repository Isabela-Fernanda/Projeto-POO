import { Raca } from "../racas/raca.ts";
import { Classe } from "./classes/classe.ts";
import { Atributos, TipoAtributo } from "./atributos/atributos.ts";
import { Inventario } from "../inventario/inventario.ts";
import { Equipamento } from "../inventario/equipamento.ts";
import { Pericia } from "../pericias/pericia.ts";
import { GrauTreinamento } from "../pericias/grauTreinamento.ts";
import { Habilidade } from "../habilidades/habilidades.ts";
import { CalculadoraDano } from "../combate/calcularDano.ts";
import { CalculadoraDefesa } from "../combate/calcularDefesa.ts";

export abstract class Personagem {
    protected vidaAtual: number;
    protected vidaMaxima: number;
    protected manaAtual: number;
    protected manaMaxima: number;
    protected deslocamento: number;
    protected bonusDefesaTemporario: number = 0;
    protected tags: string[] = [];

    constructor(
        protected nome: string,
        protected nivel: number,
        protected raca: Raca,
        protected classe: Classe | null,
        protected atributos: Atributos,
        protected inventario: Inventario,
        protected equipamento: Equipamento,
        protected pericias: Map<Pericia, GrauTreinamento>,
        protected bonusPericias: Map<Pericia, number>,
        protected habilidades: Habilidade[],
    ) {
        this.vidaMaxima = (classe?.getVidaInicial() ?? 0) + this.getConstituicao();
        this.manaMaxima = (classe?.getManaInicial() ?? 0);

        this.vidaAtual = this.vidaMaxima;
        this.manaAtual = this.manaMaxima;

        this.deslocamento = 9;
    }

    abstract atacar(alvo?: Personagem): void;

    receberDano(dano: number): void {
        this.vidaAtual -= dano;
        if (this.vidaAtual < 0) {
            this.vidaAtual = 0;
        }
    }

    estaVivo(): boolean {
        return this.vidaAtual > 0;
    }

    getNome(): string {
        return this.nome;
    }

    getNivel(): number {
        return this.nivel;
    }

    getClasse(): Classe | null {
        return this.classe;
    }

    getRaca(): Raca {
        return this.raca;
    }

    getInventario(): Inventario {
        return this.inventario;
    }

    /* ------------------------------------------------------------ */
    /* --------------------------- VIDA --------------------------- */
    /* ------------------------------------------------------------ */

    getVidaAtual(): number {
        return this.vidaAtual;
    }

    getVidaMaxima(): number {
        return this.vidaMaxima;
    }

    aumentarVidaMaxima(valor: number): void {
        this.vidaMaxima += valor;
        this.vidaAtual += valor;
    }

    regenerarVida(valor: number): void {
        this.vidaAtual += valor;

        if (this.vidaAtual > this.vidaMaxima) {
            this.vidaAtual = this.vidaMaxima;
        }
    }

    /* ------------------------------------------------------------ */
    /* -------------------------- MANA ---------------------------- */
    /* ------------------------------------------------------------ */

    getManaAtual(): number {
        return this.manaAtual;
    }

    getManaMaxima(): number {
        return this.manaMaxima;
    }

    aumentarManaMaxima(valor: number): void {
        this.manaMaxima += valor;
        this.manaAtual += valor;
    }

    gastarMana(valor: number): boolean {
        if (this.manaAtual < valor) {
            return false;
        }

        this.manaAtual -= valor;
        return true;
    }

    regenerarMana(valor: number): void {
        this.manaAtual += valor;

        if (this.manaAtual > this.manaMaxima) {
            this.manaAtual = this.manaMaxima;
        }
    }

    /* ------------------------------------------------------------ */
    /* ---------------------- DESLOCAMENTO ------------------------ */
    /* ------------------------------------------------------------ */

    getDeslocamento(): number {
        return this.deslocamento;
    }
    setDeslocamento(valor: number): void {
        this.deslocamento = valor;
    }

    /* ------------------------------------------------------------ */
    /* --------------------------- TAG ---------------------------- */
    /* ------------------------------------------------------------ */

    adicionarTag(tag: string): void {
        this.tags.push(tag);
    }

    possuiTag(tag: string): boolean {
        return this.tags.includes(tag);
    }

    getTags(): string[] {
        return [...this.tags];
    }

    /* ------------------------------------------------------------ */
    /* ------------------------ ATRIBUTOS ------------------------- */
    /* ------------------------------------------------------------ */

    getAtributos(): Atributos {
        return this.atributos;
    }

    getForca(): number {
        return (this.atributos.getAtributo(TipoAtributo.FORCA));
    }
    getDestreza(): number {
        return (this.atributos.getAtributo(TipoAtributo.DESTREZA));
    }
    getConstituicao(): number {
        return (this.atributos.getAtributo(TipoAtributo.CONSTITUICAO));
    }
    getInteligencia(): number {
        return (this.atributos.getAtributo(TipoAtributo.INTELIGENCIA));
    }
    getSabedoria(): number {
        return (this.atributos.getAtributo(TipoAtributo.SABEDORIA));
    }
    getCarisma(): number {
        return (this.atributos.getAtributo(TipoAtributo.CARISMA));
    }

    getAtributo(tipo: TipoAtributo): number {
        switch (tipo) {
            case TipoAtributo.FORCA:
                return this.getForca();

            case TipoAtributo.DESTREZA:
                return this.getDestreza();

            case TipoAtributo.CONSTITUICAO:
                return this.getConstituicao();

            case TipoAtributo.INTELIGENCIA:
                return this.getInteligencia();

            case TipoAtributo.SABEDORIA:
                return this.getSabedoria();

            case TipoAtributo.CARISMA:
                return this.getCarisma();
        }
    }

    getModificadorAtributo(tipo: TipoAtributo): number {
       const valor = this.getAtributo(tipo);

       return Atributos.calcularModificador(valor);
    }

    /* ------------------------------------------------------------ */
    /* ------------------------- DEFESA --------------------------- */
    /* ------------------------------------------------------------ */

    getDefesa(): number {
        return CalculadoraDefesa.calcular(this);
    }

    /* ------------------------------------------------------------ */
    /* ---------------------- HABILIDADES ------------------------- */
    /* ------------------------------------------------------------ */

    getHabilidades(): Habilidade[] {
        return this.habilidades;
    }

    possuiHabilidade(nome: string): boolean {
        return this.habilidades.some(habilidade =>
            habilidade.getNome() === nome
        );
    }

    /* ------------------------------------------------------------ */
    /* ---------------------- EQUIPAMENTO ------------------------- */
    /* ------------------------------------------------------------ */

    getEquipamento(): Equipamento {
        return this.equipamento;
    }

    /* ------------------------------------------------------------ */
    /* ------------------------- PERICIA -------------------------- */
    /* ------------------------------------------------------------ */

    adicionarPericia(pericia: Pericia, grau: GrauTreinamento = GrauTreinamento.TREINADO): void {
        this.pericias.set(pericia, grau);
    }

    adicionarBonusPericia(pericia: Pericia, valor: number): void {
        const atual = this.bonusPericias.get(pericia) ?? 0;

        this.bonusPericias.set(pericia, atual + valor);
    }

    getPericias(): Map<Pericia, GrauTreinamento> {
        return this.pericias;
    }

    getBonusPericia(pericia: Pericia): number {
        return this.bonusPericias.get(pericia) ?? 0;
    }

    getGrauTreinamento(pericia: Pericia): GrauTreinamento {
        return (this.pericias.get(pericia) ?? GrauTreinamento.DESTREINADO);
    }

    possuiPericia(pericia: Pericia): boolean {
        return this.pericias.has(pericia);
    }

    /* ------------------------------------------------------------ */
    /* -------------------- BONUS TEMPORARIOS --------------------- */
    /* ------------------------------------------------------------ */
    receberBonusDefesaTemporario(valor: number): void {
        this.bonusDefesaTemporario += valor;
    }
    getBonusDefesaTemporario(): number {
        return this.bonusDefesaTemporario;
    }

}