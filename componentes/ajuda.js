import { conteudoHeader, secaoDeExibicao } from './headerFeed.js';
import { validarSessaoStorage } from './validacoes.js';

export const infoAjuda = () => {
  const articlePainel = document.createElement('article');
  articlePainel.classList.add('artPainel');
  articlePainel.setAttribute('id', 'artPainel');

  const headerFeed = document.createElement('header');
  headerFeed.classList.add('item1');
  headerFeed.innerHTML = conteudoHeader();

  const secaoExibicaoCategoria = document.createElement('div');
  secaoExibicaoCategoria.classList.add('exibicaoCategoria');
  secaoExibicaoCategoria.innerHTML = secaoDeExibicao();

  const navInferior = document.createElement('nav');
  navInferior.classList.add('barraNavegacaoInferior');
  const userData = validarSessaoStorage();
  navInferior.innerHTML = `
            <ul>
            <li class="list">
                <a href="#/timeline">
                    <span class="icon">
                        <img src="imagens/home2.png">
                    </span>
                </a>
            </li>
            <li class="list">
                <a class="abrirExibicao">
                    <span class="icon">
                        <img src="imagens/busca.png">
                    </span>
                </a>
            </li>
            <li class="list">
                <a href="#/meuperfil">
                    <span class="iconUser">
                        <img src="${userData.imgUsuario}">
                    </span>
                </a>
            </li>
            </ul>
        `;

  const textHelp = document.createElement('nav');
  textHelp.classList.add('texto-info');
  textHelp.innerHTML = `
            <h2 class="title-text">Aqui você não vai ficar sozinha!</h2>
            <p class="info">Nessa rede social, temos a ciência de que infelizmente nós não conseguiríamos dar um auxílio conveniente, em se tratando de violência física e psicológica. O que podemos fazer é dar a você, que precisa desse auxílio mais sério e específico, a oportunidade de conhecer e ter acesso a alguns canais de comunicação, que irão te auxiliar de forma adequada e justa.</p>
            <p class="info">Só no Brasil, a cada minuto de 2021, 8 mulheres apanharam durante a pandemia do novo coronavírus. E não só a violência física aumentou, como a psicológica, que mesmo não deixando marcas físicas, feriu também a dignidade de muitas de nós, que acabaram sendo obrigadas a se isolar com companheiros abusivos nesse contexto de crise sanitária.</p>
            <p class="info">A ideia então é que você, mulher, que já sofre diariamente com todo o machismo imposto no mundo, não seja mais uma vítima de tragédias maiores. Procure sim por ajuda, e não tenha medo jamais de se calar!</p>
            <h2 class="title-text">Alguns meios de comunicação úteis:</h2>
            <p class="info">Quem sofre violência doméstica pode procurar ajuda ligando 180, serviço de informações e denúncia da Central de Atendimento à Mulher funciona 24h por dia e garante o anonimato da vítima. Em casos de emergência, é necessário ligar para a polícia no número 190 ou procurar uma das Delegacias Especializadas de Atendimento à Mulher (DEAMs), que têm caráter preventivo e repressivo, devendo realizar ações de prevenção, apuração, investigação e enquadramento legal dos casos de violência contra a mulher, respeitando os direitos humanos e os princípios do Estado Democrático de Direito.</p>
            <h2 class="title-text">Órgãos Públicos:</h2>
            <h1 class="subtitle-text">Centros Especializado de Atendimento à Mulher</h1>
            <p class="info">São um espaço de acolhimento e atendimento psicológico e social, orientação e encaminhamento jurídico à mulher em situação de violência.</p>
            <h1 class="subtitle-text">Casas-Abrigo</h1>
            <p class="info">São locais seguros que oferecem morada protegida e atendimento integral a mulheres em risco de morte iminente em razão da violência doméstica. O serviço é sigiloso e temporário, até que a vítima tenha condição de retomar o curso de sua vida.</p>
            <h1 class="subtitle-text">Casas de Acolhimento Provisório</h1>
            <p class="info">Oferecem abrigo temporário - de até 15 dias - e não-sigiloso para mulheres em situação de violência, acompanhadas ou não de filhos, que não correm risco iminente de morte. Além de garantir a integridade física e emocional das vítimas, realiza diagnóstico dos casos para encaminhamentos necessários.</p>
            <h1 class="subtitle-text">Defensorias Públicas e Defensorias da Mulher</h1>
            <p class="info">São órgãos do estado responsável pela defesa de cidadãs que não possuem condições econômicas para contratação de advogados. Oferecem assistência jurídica, orientação, encaminhamento acompanhamento de processos às mulheres em situação de violência.</p>
            <h1 class="subtitle-text">Juizados de Violência Doméstica e Familiar contra a Mulher</h1>
            <p class="info">São órgãos da Justiça ordinária com competência civil e criminal para processo, julgamento e execução das causas decorrentes da prática de violência doméstica e familiar contra a mulher.</p>
            <h1 class="subtitle-text">Promotorias de Justiça de Defesa da Mulher em Situação de Violência Doméstica e Familiar</h1>
            <p class="info">São responsáveis por mover ação penal pública, solicitar à Polícia Civil o início ou o prosseguimento de investigações e ao Poder Judiciário a concessão de medidas protetivas de urgência nos casos de violência contra a mulher. Para atendimento, procure o Ministério Público da sua cidade.</p>
            <h1 class="subtitle-text">Casa da Mulher Brasileira</h1>
            <p class="info">Integra no mesmo espaço serviços especializados para diversos tipos de violência contra as mulheres, como acolhimento e triagem, apoio psicossocial, delegacia, juizado, Ministério Público, Defensoria Pública, promoção de autonomia econômica, cuidado de crianças, alojamento de passagem e central de transportes.</p>
            <h1 class="subtitle-text">Atendimento hospitalar geral ou especializado em casos de violência doméstica e sexual</h1>
            <p class="info">Por meio da Norma Técnica de Prevenção e Tratamento dos Agravos Resultantes da Violência Sexual contra Mulheres e Adolescentes, eles devem prestar assistência médica, de enfermagem, psicológica e social às mulheres vítimas de violência doméstica e de violência sexual, inclusive quanto à interrupção da gravidez prevista em lei nos casos de estupro. Casos de violência são considerados de notificação compulsória e devem ser notificados pelos sistemas de saúde.</p>
            <h1 class="subtitle-text">Para mais Informações, acesse o site do Senado abaixo:</h1>
            <p class="icon-dev"><a href="https://www12.senado.leg.br/institucional/omv/acoes-contra-violencia/servicos-especializados-de-atendimento-a-mulher" target="_blank">- Serviços Especializados de Atendimento à Mulher -</a></p>
            <div class="box-frase">
            <h2 class="title-text">"Que nada nos defina, que nada nos sujeite. Que a liberdade seja a nossa própria substância, já que viver é ser livre"</h2>
            <h1 class="subtitle-text">- Simone de Beavouir.</h1>
            </div>
        `;

  const footer = document.createElement('footer');
  footer.classList.add('footerDesktop');
  footer.innerHTML = '';

  articlePainel.appendChild(headerFeed);
  articlePainel.appendChild(secaoExibicaoCategoria);
  articlePainel.appendChild(navInferior);
  articlePainel.appendChild(textHelp);
  articlePainel.appendChild(footer);

  return articlePainel;
};
