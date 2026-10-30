import * as THREE from "three";

export class Colisoes3D {
    private readonly obstaculos: THREE.Object3D[] = [];
    private readonly raycaster = new THREE.Raycaster();

    constructor(
        private readonly raioPersonagem = 0.35,
        private readonly margemCamera = 0.3
    ) { }

    public registrarObstaculo(obstaculo: THREE.Object3D): void {
        this.obstaculos.push(obstaculo);
    }

    public removerObstaculo(obstaculo: THREE.Object3D): void {
        const indice = this.obstaculos.indexOf(obstaculo);

        if (indice !== -1) {
            this.obstaculos.splice(indice, 1);
        }
    }

    public limparObstaculos(): void {
        this.obstaculos.length = 0;
    }

    public colideComObstaculo(x: number, z: number): boolean {
        const raio = this.raioPersonagem;
        const posicaoMundo = new THREE.Vector3(x, 0, z);

        for (const obstaculo of this.obstaculos) {
            obstaculo.updateWorldMatrix(true, false);

            // Transforma a posição do personagem para o espaço local
            // do obstáculo, levando em conta a rotação da porta.
            const inversa = obstaculo.matrixWorld.clone().invert();
            const posicaoLocal = posicaoMundo.clone().applyMatrix4(inversa);

            const malha = obstaculo as THREE.Mesh;
            const geometria = malha.geometry;

            if (!geometria.boundingBox) {
                geometria.computeBoundingBox();
            }

            const caixa = geometria.boundingBox;

            if (!caixa) continue;

            // Verifica a distância até a folha no plano XZ local.
            const pontoX = THREE.MathUtils.clamp(
                posicaoLocal.x,
                caixa.min.x,
                caixa.max.x
            );

            const pontoZ = THREE.MathUtils.clamp(
                posicaoLocal.z,
                caixa.min.z,
                caixa.max.z
            );

            const dx = posicaoLocal.x - pontoX;
            const dz = posicaoLocal.z - pontoZ;

            // Considera a escala do obstáculo no cálculo do raio.
            const escala = obstaculo.getWorldScale(new THREE.Vector3());
            const raioLocal = raio / Math.max(
                Math.abs(escala.x),
                Math.abs(escala.z),
                0.0001
            );

            if (dx * dx + dz * dz < raioLocal * raioLocal) {
                return true;
            }
        }

        return false;
    }

    public calcularPosicaoSeguraCamera(
        alvo: THREE.Vector3,
        posicaoDesejada: THREE.Vector3
    ): THREE.Vector3 {
        const direcao = posicaoDesejada.clone().sub(alvo);
        const distanciaDesejada = direcao.length();

        if (distanciaDesejada === 0) {
            return posicaoDesejada.clone();
        }

        direcao.normalize();

        this.raycaster.set(alvo, direcao);
        this.raycaster.near = 0;
        this.raycaster.far = distanciaDesejada;

        let menorDistancia = distanciaDesejada;

        for (const obstaculo of this.obstaculos) {
            obstaculo.updateWorldMatrix(true, false);

            const caixa = new THREE.Box3().setFromObject(obstaculo);

            const pontoIntersecao = this.raycaster.ray.intersectBox(
                caixa,
                new THREE.Vector3()
            );

            if (!pontoIntersecao) continue;

            const distancia = alvo.distanceTo(pontoIntersecao);

            if (distancia < menorDistancia) {
                menorDistancia = distancia;
            }
        }

        const distanciaSegura = Math.max(
            0,
            menorDistancia - this.margemCamera
        );

        return alvo.clone().add(
            direcao.multiplyScalar(distanciaSegura)
        );
    }
}


