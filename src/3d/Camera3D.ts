import * as THREE from "three";

export type ModoCamera = "primeira" | "terceira";

export class Camera3D {
    private readonly camera: THREE.PerspectiveCamera;

    private modo: ModoCamera = "terceira";

    private rotacaoHorizontal = Math.atan2(7, 10);
    private rotacaoVertical = 0.35;

    private distancia = 8;
    private readonly distanciaMinima = 2;
    private readonly distanciaMaxima = 12;

    private readonly alturaMinima = 0.5;
    private readonly alturaOlhos = 1.4;

    private arrastando = false;
    private ultimoMouseX = 0;
    private ultimoMouseY = 0;

    private readonly sensibilidadeMouse = 0.005;

    constructor(largura: number, altura: number) {
        this.camera = new THREE.PerspectiveCamera(
            60,
            largura / altura,
            0.1,
            100
        );

        this.camera.position.set(7, 8, 10);
        this.camera.lookAt(0, 0, 0);
    }

    public getCamera(): THREE.PerspectiveCamera {
        return this.camera;
    }

    public getRotacaoHorizontal(): number {
        return this.rotacaoHorizontal;
    }

    public getModo(): ModoCamera {
        return this.modo;
    }

    public alternarModo(): void {
        this.modo = this.modo === "terceira" ? "primeira" : "terceira";
    }

    public iniciarRotacao(x: number, y: number): void {
        this.arrastando = true;
        this.ultimoMouseX = x;
        this.ultimoMouseY = y;
    }

    public rotacionar(x: number, y: number): void {
        if (!this.arrastando) return;

        const deltaX = x - this.ultimoMouseX;
        const deltaY = y - this.ultimoMouseY;

        this.ultimoMouseX = x;
        this.ultimoMouseY = y;

        this.rotacaoHorizontal -= deltaX * this.sensibilidadeMouse;

        const limiteInferior =
            this.modo === "primeira" ? -1.4 : -0.35;

        this.rotacaoVertical = THREE.MathUtils.clamp(
            this.rotacaoVertical - deltaY * this.sensibilidadeMouse,
            limiteInferior,
            Math.PI / 2
        );
    }

    public finalizarRotacao(): void {
        this.arrastando = false;
    }

    public ajustarZoom(delta: number, evento: WheelEvent): void {
        if (this.modo !== "terceira") return;

        evento.preventDefault();

        this.distancia = THREE.MathUtils.clamp(
            this.distancia + delta * 0.01,
            this.distanciaMinima,
            this.distanciaMaxima
        );
    }

    public atualizar(
        personagem: THREE.Object3D,
        calcularPosicaoSegura: (
            alvo: THREE.Vector3,
            posicaoDesejada: THREE.Vector3
        ) => THREE.Vector3
    ): void {
        const alvo = personagem.position.clone();
        alvo.y += this.alturaOlhos;

        personagem.visible = this.modo !== "primeira";

        const cosVertical = Math.cos(this.rotacaoVertical);

        const direcao = new THREE.Vector3(
            Math.sin(this.rotacaoHorizontal) * cosVertical,
            Math.sin(this.rotacaoVertical),
            Math.cos(this.rotacaoHorizontal) * cosVertical
        );

        if (this.modo === "primeira") {
            this.camera.position.copy(alvo);

            this.camera.lookAt(
                alvo.x - direcao.x,
                alvo.y + direcao.y,
                alvo.z - direcao.z
            );

            return;
        }

        const posicaoDesejada = new THREE.Vector3(
            alvo.x + direcao.x * this.distancia,
            alvo.y + direcao.y * this.distancia,
            alvo.z + direcao.z * this.distancia
        );

        this.camera.position.copy(
            calcularPosicaoSegura(alvo, posicaoDesejada)
        );

        this.camera.position.y = Math.max(
            this.camera.position.y,
            this.alturaMinima
        );

        this.camera.lookAt(alvo);
    }

    public redimensionar(largura: number, altura: number): void {
        if (largura === 0 || altura === 0) return;

        this.camera.aspect = largura / altura;
        this.camera.updateProjectionMatrix();
    }
}
