import { conteudoHeader, secaoDeExibicao } from "./headerFeed.js";
import { validarSessaoStorage } from "./validacoes.js";


export const sobreNos = () => {
    const articlePainel = document.createElement('article');
    articlePainel.classList.add('artPainel');
    articlePainel.setAttribute('id', 'artPainel');

    const headerFeed = document.createElement("header");
    headerFeed.classList.add("item1");
    headerFeed.innerHTML = conteudoHeader();

    const secaoExibicaoCategoria = document.createElement('div');
    secaoExibicaoCategoria.classList.add('exibicaoCategoria');
    secaoExibicaoCategoria.innerHTML = secaoDeExibicao();

    const navInferior = document.createElement("nav");
    navInferior.classList.add("barraNavegacaoInferior");
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

        const textInfo = document.createElement("nav");
        textInfo.classList.add("texto-info");
        textInfo.innerHTML = `
            <h2 class="title-text">Um pouco sobre nós</h2>
            <h1 class="subtitle-text">Speak your mind and find support: Fale o que pensa e encontre apoio</h1>
            <p class="info">A ideia da rede social surgiu de uma dupla de alunas da Laboratoria, que, cansadas de serem hostilizadas por esse mundo dominado por homens, principalmente quando se trata desse imenso campo de tecnologia, resolveram criar um espaço apenas para garotas. O objetivo é ter um espaço para ser o que quisermos ser, e fazer o que quisermos fazer... sem hostilidades, sem conotações sexuais, sem palpites desnecessários e misóginos...</p>
            <h1 class="subtitle-text">Mas espera... grrrl talk? O que é isso?</h1>
            <p class="info">O nome dessa rede social surgiu de uma junção de garota, que em inglês é traduzido para girl, com uma onomatopeia que se refere, geralmente, a um grunhido, o grrr, que muitas vezes significa um som de raiva/desaprovação. Assim Girl + Grrr = Grrrl, junto com o talk (falar), tentam resumir toda aquela "revirada de olhos" ao ouvir comentários machistas.</p>
            <h1 class="subtitle-text">Agora que já deu pra entender um pouquinho sobre nossa rede social cheia de amor, que tal conhecer as garotas desenvolvedoras por trás desse projeto?</h1>
            <div class="box-dev">
                <p class="info-dev"><img src="imagens/AmandaG.jpeg"></p>
                <h1 class="subtitle-text">Amanda Gusmão</h1>
                <p class="info">Engenheira Civil e Ambiental, apaixonada por geociências, e com algumas aspirações bem específicas para querer tornar esse app uma realidade: ela é gamer, streamer e aspirante a blogueira nas horas vagas. Um prato cheio pra quem quer fazer comentários completamente desnecessários! E você pode a conhecer melhor através do avatar abaixo:</p>
                <p class="icon-dev"><a href="https://linkr.bio/amandagusmao" target="_blank"><img src="imagens/gamer.png">A mãe tá on e codando</a></p>
            </div>
            <div class="box-dev">
                <p class="info-dev"><img src="imagens/LayssaA.jpeg"></p>
                <h1 class="subtitle-text">Layssa Aragão</h1>
                <p class="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p class="icon-dev"><a href="https://linkr.bio/amandagusmao" target="_blank"><img src="imagens/gamer.png">A mãe tá on</a></p>
            </div>
        `;
    
        const footer = document.createElement("footer");
        footer.classList.add("footerDesktop");
        footer.innerHTML = "";

    articlePainel.appendChild(headerFeed);
    articlePainel.appendChild(secaoExibicaoCategoria);
    articlePainel.appendChild(navInferior);
    articlePainel.appendChild(textInfo);
    articlePainel.appendChild(footer);

  return articlePainel;
};


//a nav inferior some acima de 1024 x 863 px