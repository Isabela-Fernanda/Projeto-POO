export type TeclaControle = "w" | "a" | "s" | "d";

interface OpcoesControles3D {
    aoInteragir: () => void;
    aoAlternarCamera: () => void;
    aoIniciarRotacao: (x: number, y: number) => void;
    aoRotacionar: (x: number, y: number) => void;
    aoFinalizarRotacao: () => void;
    aoAjustarZoom: (delta: number, evento: WheelEvent) => void;
}

export class Controles3D {
    private readonly teclas = new Set<TeclaControle>();

    constructor(
        private readonly elemento: HTMLElement,
        private readonly opcoes: OpcoesControles3D,
    ) {
        window.addEventListener("keydown", this.aoPressionarTecla);
        window.addEventListener("keyup", this.aoSoltarTecla);

        this.elemento.addEventListener(
            "mousedown",
            this.aoIniciarRotacao,
        );

        window.addEventListener("mousemove", this.aoRotacionar);
        window.addEventListener("mouseup", this.aoFinalizarRotacao);

        this.elemento.addEventListener(
            "wheel",
            this.aoAjustarZoom,
            { passive: false },
        );
    }

    public getTeclas(): ReadonlySet<TeclaControle> {
        return this.teclas;
    }

    private aoPressionarTecla = (evento: KeyboardEvent): void => {
        const tecla = evento.key.toLowerCase();

        if (["w", "a", "s", "d"].includes(tecla)) {
            evento.preventDefault();
            this.teclas.add(tecla as TeclaControle);
        }

        if (tecla === "e" && !evento.repeat) {
            evento.preventDefault();
            this.opcoes.aoInteragir();
        }

        if (tecla === "v" && !evento.repeat) {
            evento.preventDefault();
            this.opcoes.aoAlternarCamera();
        }
    };

    private aoSoltarTecla = (evento: KeyboardEvent): void => {
        this.teclas.delete(
            evento.key.toLowerCase() as TeclaControle,
        );
    };

    private aoIniciarRotacao = (evento: MouseEvent): void => {
        if (evento.button !== 0) return;

        this.opcoes.aoIniciarRotacao(
            evento.clientX,
            evento.clientY,
        );
    };

    private aoRotacionar = (evento: MouseEvent): void => {
        this.opcoes.aoRotacionar(
            evento.clientX,
            evento.clientY,
        );
    };

    private aoFinalizarRotacao = (): void => {
        this.opcoes.aoFinalizarRotacao();
    };

    private aoAjustarZoom = (evento: WheelEvent): void => {
        this.opcoes.aoAjustarZoom(evento.deltaY, evento);
    };

    public destruir(): void {
        window.removeEventListener("keydown", this.aoPressionarTecla);
        window.removeEventListener("keyup", this.aoSoltarTecla);

        this.elemento.removeEventListener(
            "mousedown",
            this.aoIniciarRotacao,
        );

        window.removeEventListener("mousemove", this.aoRotacionar);
        window.removeEventListener("mouseup", this.aoFinalizarRotacao);

        this.elemento.removeEventListener(
            "wheel",
            this.aoAjustarZoom,
        );

        this.teclas.clear();
    }
}
