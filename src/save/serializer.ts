import { Habilidade } from "@poderes/habilidades.js";

type Fabrica<T = any> = () => T;

export class Serializer {
    private static readonly fabricas = new Map<string, Fabrica>();

    static registrar<T>(nome: string, fabrica: Fabrica<T>): void {
        this.fabricas.set(nome, fabrica);
    }

    static registrarClasse(classe: Function) {
        this.registrar(classe.name, () => Object.create(classe.prototype));
    }

    static serializar(objeto: any): string {
        return JSON.stringify(objeto, this.replacer.bind(this), 4);
    }

    static desserializar<T>(json: string): T {
        return JSON.parse(json, this.reviver.bind(this));
    }

    private static replacer(_key: string, value: any): any {
        if (value instanceof Date) {
            return {
                $type: "Date",
                value: value.toISOString()
            };
        }

        if (value instanceof Map) {
            return {
                $type: "Map",
                values: [...value.entries()]
            };
        }

        if (value instanceof Set) {
            return {
                $type: "Set",
                values: [...value]
            };
        }

        if (Array.isArray(value)) {
            return value;
        }


        if (value && typeof value === "object" && value.constructor !== Object) {
            return {
                $type: value.constructor.name,
                ...value
            };
        }
        return value;
    }

    private static reviver(_key: string, value: any): any {
        if (!value || typeof value !== "object")
            return value;

        if (value.$type === "Date") {
            return new Date(value.value);
        }

        const tipo = value.$type;

        if (!tipo) return value;

        if (tipo === "Map") {
            return new Map(value.values);
        }

        if (tipo === "Set") {
            return new Set(value.values);
        }

        delete value.$type;

        const fabrica = this.fabricas.get(tipo);

        if (!fabrica) return value;

        const objeto = fabrica();
        Object.assign(objeto, value);

        return objeto;
    }
}