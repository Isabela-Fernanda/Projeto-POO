export class Dado {
    static rolar(
        faces: number
    ): number {
        return Math.floor(Math.random() * faces) + 1;
    }  
}