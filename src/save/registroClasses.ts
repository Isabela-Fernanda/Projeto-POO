import { Serializer } from "./serializer.js";

import { Save } from "./save.js";
import { Campanha } from "./campanha.js";
import { Historico } from "./historico.js";
import { RegistroPersonagem } from "./registroPersonagem.js";

import { Personagem } from "@personagens/personagem.js";
import { Jogador } from "@personagens/tiposPersonagem/jogador.js";
import { Inimigo } from "@personagens/tiposPersonagem/inimigo.js";
import { Monstro } from "@personagens/tiposPersonagem/monstro.js";
import { CatalogoMonstros } from "@personagens/tiposPersonagem/catalogoMonstros.js";
import { Atributos } from "@personagens/atributos/atributos.js";

// Core e Definições de Base
import { Raca } from "@personagens/racas/raca.js";
import { Anao } from "@personagens/racas/anao.js";
import { Elfo } from "@personagens/racas/elfo.js";
import { Humano } from "@personagens/racas/humano.js";
import { ConhecimentoDasRochas, TradicaoDeHeredrimm, DevagarESempre, DuroComoPedra, GracaDeGlorienn, HerancaFeerica, SentidosElficos, Versatil } from "@personagens/racas/poderesRaciais.js";

import { Classe } from "@personagens/classes/classe.js";
import { Arcanista } from "@personagens/classes/arcanista.js";
import { Cacador } from "@personagens/classes/cacador.js";
import { Guerreiro } from "@personagens/classes/guerreiro.js";
import { MagiasAprendidas, MagiasArcanas, Explorador, MarcaDaPresa, AtaqueEspecial} from "@personagens/classes/poderesDeClasse.js";


import { Mapa } from "@mapa/mapa.js";
import { Sala } from "@mapa/sala.js";
import { GerenciadorTutorial } from "@mapa/salas/gerenciadorTutorial.js";
import { MasmorraTutorial } from "@mapa/salas/masmorraTutoria.js";
import { SalaInicial } from "@mapa/salas/salaInicial.js";
import { Objeto } from "@mapa/objeto.js";
import { Conexao } from "@mapa/conexao.js";
import { Passagem, Porta } from "@mapa/porta.js";
import { Mesa, Bau, Estante, Espolio, Portal } from "@mapa/catalogoObjetos.js";

// Sistema de Inventário e Itens
import { Inventario } from "@inventario/inventario.js";
import { Item } from "@itens/item.js";
import { Equipamento} from "@inventario/equipamento.js";
import { Arma } from "@itens/arma.js";
import { Armadura } from "@itens/armadura.js";
import { Chave } from "@itens/chave.js";
import { Municao } from "@itens/municao.js";
import { CatalogoArmas } from "@itens/catalogos/catalogoArmas.js";
import { CatalogoArmaduras } from "@itens/catalogos/catalogoArmadura.js"
import { CatalogoChaves } from "@itens/catalogos/catalogoChaves.js";
import { CatalogoItensDiversos } from "@itens/catalogos/catalogoItensDiverso.js";
import { CatalogoMunicao } from "@itens/catalogos/catalogoMunicao.js"

// Sistema de Perícias
import { Pericia } from "@pericias/pericia.js";
import { CatalogoPericias } from "@pericias/catalogoPericias.js";

// Poderes, Condições e Estados
import { Habilidade } from "@poderes/habilidades.js";
import { Caracteristica } from "@poderes/caracteristica.js";
import { Efeito } from "@poderes/efeito.js";
import { EfeitoArea } from "@poderes/efeitoArea.js";
import { EfeitoArmaduraDeAllihanna } from "@poderes/efeitos/armaduraDeAllihanna.js"
import { EfeitoAlerta } from "@poderes/efeitos/efeitoAlerta.js"
import { EfeitoArmaMagica } from "@poderes/efeitos/efeitoArmaMagica.js"
import { EfeitoArmaduraArcana } from "@poderes/efeitos/efeitoArmaduraArcana.js"
import { EfeitoConcentracaoCombate } from "@poderes/efeitos/efeitoConcentracaoCombate.js"
import { EfeitoAbalado, EfeitoAmedrontado, EfeitoApavorado, EfeitoAtordoado, EfeitoCaido, EfeitoCamuflado, EfeitoCego, EfeitoDesequilibrado, EfeitoEnredado, EfeitoEnvenenado, EfeitoFascinado, EfeitoFatigado, EfeitoInconsciente, EfeitoOfuscado, EfeitoParalisado, EfeitoPasmo, EfeitoQueimando, EfeitoSangrando, EfeitoVulneravel} from "@poderes/efeitos/efeitoCondicao.js"
import { EfeitoControlarPlantas } from "@poderes/efeitos/efeitoControlarPlantas.js"
import { EfeitoDesafio } from "@poderes/efeitos/efeitoDesafio.js"
import { EfeitoDisfarceIlusorio } from "@poderes/efeitos/efeitoDisfarceIlusorio.js"
import { EfeitoEnfeiticado } from "@poderes/efeitos/efeitoEnfeiticado.js"
import { EfeitoEscuridaoArcana } from "@poderes/efeitos/efeitoEscuridao.js"
import { EfeitoFuria } from "@poderes/efeitos/efeitoFuria.js"
import { EfeitoImagemEspelhada } from "@poderes/efeitos/efeitoImagemEspelhada.js"
import { EfeitoInspiracao } from "@poderes/efeitos/efeitoInspiracao.js"
import { EfeitoLuzArcana } from "@poderes/efeitos/efeitoLuzArcana.js"
import { EfeitoMarcaDaPresa } from "@poderes/efeitos/efeitoMarcaDaPresa.js"
import { EfeitoNevoaCondicao } from "@poderes/efeitos/efeitoNevoaCondicao.js"
import { EfeitoPrimorAtletico } from "@poderes/efeitos/efeitoPrimorAtletico.js"
import { EfeitoResistenciaEnergia } from "@poderes/efeitos/efeitoResistenciaEnergia.js"
import { EfeitoTerrenoEscorregadio } from "@poderes/efeitos/efeitoTerrenoEscorregadio.js"
import { EfeitoVisaoMistica } from "@poderes/efeitos/efeitoVisaoMistica.js"
import { EfeitoVitalidadeFantasma } from "@poderes/efeitos/efeitoVitalidadeFantasma.js"

import { EfeitoAlarme } from "@poderes/efeitos/efeitoArea/efeitoAlarme.js"
import { EfeitoAreaEscorregadia } from "@poderes/efeitos/efeitoArea/efeitoAreaEscorregadia.js"
import { EfeitoNevoa } from "@poderes/efeitos/efeitoArea/efeitoNevoa.js"
import { EfeitoTeia } from "@poderes/efeitos/efeitoArea/efeitoTeia.js"

import { Magia} from "@poderes/magia/magia.js";
import { MagiaArea } from "@poderes/magia/magiaArea.js";
import { MagiaSustentada } from "@poderes/magia/magiaSustentada.js";
import { UtilitarioCondicao, UtilitarioCura, UtilitarioInvocacao, UtilitarioMagia, UtilitarioResistencia, UtilitarioTransformacao } from "@poderes/magia/utilitarios.js";
import { CatalogoMagias } from "@poderes/magia/catalogoMagias.js";
import { MagiaAdagaMental } from "@poderes/magia/circulo_1/magiaAdagaMental.js";
import { MagiaAmedrontar } from "@poderes/magia/circulo_1/magiaAmedrontar.js";
import { MagiaArmaMagica } from "@poderes/magia/circulo_1/magiaArmaMagica.js";
import { MagiaArmaduraArcana } from "@poderes/magia/circulo_1/magiaArmaduraArcana.js";
import { MagiaConcentracaoDeCombate } from "@poderes/magia/circulo_1/magiaConcentracaoDeCombate.js";
import { MagiaEnfeiticar } from "@poderes/magia/circulo_1/magiaEnfeiticar.js";
import { MagiaHipnotismo } from "@poderes/magia/circulo_1/magiaHipnotismo.js";
import { MagiaPrimorAtletico } from "@poderes/magia/circulo_1/magiaPrimorAtletico.js";
import { MagiaRaioDoEnfraquecimento } from "@poderes/magia/circulo_1/magiaRaioDoEnfraquecimento.js";
import { MagiaResistenciaAEnergia } from "@poderes/magia/circulo_1/magiaResistenciaAEnergia.js";
import { MagiaSono } from "@poderes/magia/circulo_1/magiaSono.js";
import { MagiaToqueChocante } from "@poderes/magia/circulo_1/magiaToqueChocante.js";
import { MagiaVitalidadeFantasma } from "@poderes/magia/circulo_1/magiaVitalidadeFantasma.js";

import { AcuidadeComArma, AtaquePoderoso, CombateDefensivo, Esquiva, FocoEmArma, ReflexosDeCombate, SaqueRapido, Vitalidade, VontadeDeFerro} from "@poderes/poderesGerais/PoderGeral.js";
import { CatalogoPoderesGerais } from "@poderes/poderesGerais/catalogoPoderesGerais.js"

// Motores de Combate e Mecânica
import { CalculadoraDefesa } from "@combate/calcular/calcularDefesa.js";
import { TesteAtaque } from "@combate/testes/testeAtaque.js";
import { Beneficio } from "@poderes/beneficio.js";

import { Random } from "@personagens/loot.js";
import { CalcularAlcance } from "@mapa/calcularAlcance.js";

export class RegistroClasses {
    static registrarTudo() {
        Serializer.registrarClasse(Save);
        Serializer.registrarClasse(Campanha);
        Serializer.registrarClasse(Historico);
        Serializer.registrarClasse(RegistroPersonagem);
        
        Serializer.registrarClasse(Random);

        //Personagem
        Serializer.registrarClasse(Personagem);
        Serializer.registrarClasse(Jogador);
        Serializer.registrarClasse(Inimigo);
        Serializer.registrarClasse(Monstro);
        Serializer.registrarClasse(Atributos);


        //Raças
        Serializer.registrarClasse(Raca);
        Serializer.registrarClasse(Anao);
        Serializer.registrarClasse(Elfo);
        Serializer.registrarClasse(Humano);
        Serializer.registrarClasse(ConhecimentoDasRochas);
        Serializer.registrarClasse(TradicaoDeHeredrimm);
        Serializer.registrarClasse(DevagarESempre);
        Serializer.registrarClasse(DuroComoPedra);
        Serializer.registrarClasse(GracaDeGlorienn);
        Serializer.registrarClasse(HerancaFeerica);
        Serializer.registrarClasse(SentidosElficos);
        Serializer.registrarClasse(Versatil);

        //Classes
        Serializer.registrarClasse(Classe);
        Serializer.registrarClasse(Arcanista);
        Serializer.registrarClasse(Cacador);
        Serializer.registrarClasse(Guerreiro);
        Serializer.registrarClasse(MagiasAprendidas);
        Serializer.registrarClasse(MagiasArcanas);
        Serializer.registrarClasse(Explorador);
        Serializer.registrarClasse(MarcaDaPresa);
        Serializer.registrarClasse(AtaqueEspecial);


        //Mapa e Salas
        Serializer.registrarClasse(Mapa);
        Serializer.registrarClasse(Sala);
        Serializer.registrarClasse(GerenciadorTutorial);
        Serializer.registrarClasse(MasmorraTutorial);
        Serializer.registrarClasse(SalaInicial);
        Serializer.registrarClasse(CalcularAlcance);
        Serializer.registrarClasse(Conexao);
        Serializer.registrarClasse(Objeto);
        Serializer.registrarClasse(Porta);
        Serializer.registrarClasse(Passagem)
        Serializer.registrarClasse(Bau);
        Serializer.registrarClasse(Espolio);
        Serializer.registrarClasse(Estante);
        Serializer.registrarClasse(Mesa);
        Serializer.registrarClasse(Portal);


        //Inventario e Itens
        Serializer.registrarClasse(Inventario);
        Serializer.registrarClasse(Equipamento);
        Serializer.registrarClasse(Item);
        Serializer.registrarClasse(Arma);
        Serializer.registrarClasse(Armadura);
        Serializer.registrarClasse(Chave);
        Serializer.registrarClasse(Municao);
        

        //Poderes, habilidades, caracteristicas e efeitos
        Serializer.registrarClasse(Pericia);
        Serializer.registrarClasse(Habilidade);
        Serializer.registrarClasse(Caracteristica);

        Serializer.registrarClasse(Efeito);
        Serializer.registrarClasse(EfeitoArea);
        Serializer.registrarClasse(EfeitoArmaduraDeAllihanna);
        Serializer.registrarClasse(EfeitoAlerta);
        Serializer.registrarClasse(EfeitoAlarme);
        Serializer.registrarClasse(EfeitoArmaMagica);
        Serializer.registrarClasse(EfeitoArmaduraArcana);
        Serializer.registrarClasse(EfeitoConcentracaoCombate);
        Serializer.registrarClasse(EfeitoAbalado);
        Serializer.registrarClasse(EfeitoAmedrontado);
        Serializer.registrarClasse(EfeitoApavorado);
        Serializer.registrarClasse(EfeitoAtordoado);
        Serializer.registrarClasse(EfeitoCaido);
        Serializer.registrarClasse(EfeitoCamuflado);
        Serializer.registrarClasse(EfeitoCego);
        Serializer.registrarClasse(EfeitoDesequilibrado);
        Serializer.registrarClasse(EfeitoEnredado);
        Serializer.registrarClasse(EfeitoEnvenenado);
        Serializer.registrarClasse(EfeitoFascinado);
        Serializer.registrarClasse(EfeitoFatigado);
        Serializer.registrarClasse(EfeitoInconsciente);
        Serializer.registrarClasse(EfeitoOfuscado);
        Serializer.registrarClasse(EfeitoParalisado);
        Serializer.registrarClasse(EfeitoPasmo);
        Serializer.registrarClasse(EfeitoQueimando);
        Serializer.registrarClasse(EfeitoSangrando);
        Serializer.registrarClasse(EfeitoVulneravel);
        Serializer.registrarClasse(EfeitoControlarPlantas);
        Serializer.registrarClasse(EfeitoAreaEscorregadia);
        Serializer.registrarClasse(EfeitoNevoa);
        Serializer.registrarClasse(EfeitoTeia);
        Serializer.registrarClasse(EfeitoDesafio);
        Serializer.registrarClasse(EfeitoDisfarceIlusorio);
        Serializer.registrarClasse(EfeitoEnfeiticado);
        Serializer.registrarClasse(EfeitoEscuridaoArcana);
        Serializer.registrarClasse(EfeitoFuria);
        Serializer.registrarClasse(EfeitoImagemEspelhada);
        Serializer.registrarClasse(EfeitoInspiracao);
        Serializer.registrarClasse(EfeitoLuzArcana);
        Serializer.registrarClasse(EfeitoMarcaDaPresa);
        Serializer.registrarClasse(EfeitoNevoaCondicao);
        Serializer.registrarClasse(EfeitoPrimorAtletico);
        Serializer.registrarClasse(EfeitoResistenciaEnergia);
        Serializer.registrarClasse(EfeitoTerrenoEscorregadio);
        Serializer.registrarClasse(EfeitoVisaoMistica);
        Serializer.registrarClasse(EfeitoVitalidadeFantasma);

        Serializer.registrarClasse(Beneficio);

        Serializer.registrarClasse(Magia);
        Serializer.registrarClasse(MagiaArea);
        Serializer.registrarClasse(MagiaSustentada);
        Serializer.registrarClasse(UtilitarioCondicao);
        Serializer.registrarClasse(UtilitarioCura);
        Serializer.registrarClasse(UtilitarioInvocacao);
        Serializer.registrarClasse(UtilitarioMagia);
        Serializer.registrarClasse(UtilitarioResistencia);
        Serializer.registrarClasse(UtilitarioTransformacao);
        Serializer.registrarClasse(MagiaAdagaMental);
        Serializer.registrarClasse(MagiaAmedrontar);
        Serializer.registrarClasse(MagiaArmaMagica);
        Serializer.registrarClasse(MagiaArmaduraArcana);
        Serializer.registrarClasse(MagiaConcentracaoDeCombate);
        Serializer.registrarClasse(MagiaEnfeiticar);
        Serializer.registrarClasse(MagiaHipnotismo);
        Serializer.registrarClasse(MagiaPrimorAtletico);
        Serializer.registrarClasse(MagiaRaioDoEnfraquecimento);
        Serializer.registrarClasse(MagiaResistenciaAEnergia);
        Serializer.registrarClasse(MagiaSono);
        Serializer.registrarClasse(MagiaToqueChocante);
        Serializer.registrarClasse(MagiaVitalidadeFantasma);


        //Poderes Gerais
        Serializer.registrarClasse(AcuidadeComArma);
        Serializer.registrarClasse(AtaquePoderoso);
        Serializer.registrarClasse(CombateDefensivo);
        Serializer.registrarClasse(Esquiva);
        Serializer.registrarClasse(FocoEmArma);
        Serializer.registrarClasse(ReflexosDeCombate);
        Serializer.registrarClasse(SaqueRapido);
        Serializer.registrarClasse(Vitalidade);
        Serializer.registrarClasse(VontadeDeFerro);


        //Combate
        Serializer.registrarClasse(CalculadoraDefesa);
        Serializer.registrarClasse(TesteAtaque);
        

        //Catalogos
        Serializer.registrarClasse(CatalogoMonstros);
        Serializer.registrarClasse(CatalogoArmas);
        Serializer.registrarClasse(CatalogoArmaduras);
        Serializer.registrarClasse(CatalogoChaves);
        Serializer.registrarClasse(CatalogoItensDiversos);
        Serializer.registrarClasse(CatalogoMunicao);
        Serializer.registrarClasse(CatalogoPericias);
        Serializer.registrarClasse(CatalogoMagias);
        Serializer.registrarClasse(CatalogoPoderesGerais);
    }
}