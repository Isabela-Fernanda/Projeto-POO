export class Dado {
    static rolar(
        faces: number
    ): number {
        return Math.floor(Math.random() * faces) + 1;
    }
     
    //d4, d6, d8, d10, d12
    static d4(): number {
        return this.rolar(4);
    }

    static d6(): number {
        return this.rolar(6);
    }

    static d8(): number {
        return this.rolar(8);
    }

    static d10(): number {
        return this.rolar(10);
    }

    static d12(): number {
        return this.rolar(12);
    }
    
    static d20(): number {
        return this.rolar(20);
    }
}