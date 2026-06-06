export class Entrada {

    static async perguntar(
        mensagem: string
    ): Promise<string> {

        const buffer = new Uint8Array(1024);

        await Deno.stdout.write(
            new TextEncoder().encode(mensagem)
        );

        const n = await Deno.stdin.read(buffer);

        if (!n) {
            return "";
        }

        return new TextDecoder()
            .decode(buffer.subarray(0, n))
            .trim();
    }
}