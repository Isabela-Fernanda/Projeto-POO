export class Dado {
    static rolar(
        faces: number
    ): number {
        return Math.floor(Math.random() * faces) + 1;
    }  

    static d20(): number {
        return this.rolar(20);
    }

    static d6(): number {
        return this.rolar(6);
    }
}