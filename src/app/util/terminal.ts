import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

(globalThis as any).prompt = (texto?: string) => prompt(texto ?? "");

export {};