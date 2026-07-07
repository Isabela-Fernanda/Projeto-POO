import { RegistroPersonagem } from "./registroPersonagem.js";

export class Historico {
    personagensMortos: RegistroPersonagem[] = [];
    personagensVitoriosos: RegistroPersonagem[] = [];

    totalMortes = 0;
    monstrosMortos = 0;
    tesourosEncontrados = 0;
    ouroEncontrado = 0;
    tempoTotalJogado = 0;

    adicionarPersonagemMorto(registro: RegistroPersonagem) {
        this.personagensMortos.push(registro);
        this.totalMortes++;
    }

    adicionarPersonagemVitorioso(registro: RegistroPersonagem) {
        registro.venceu = true;
        this.personagensVitoriosos.push(registro);
    }
}