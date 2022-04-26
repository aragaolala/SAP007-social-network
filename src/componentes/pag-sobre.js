import { conteudoHeader, secaoDeExibicao } from "./headerFeed.js";
import { conteudoCategoria } from './categorias.js';
import { validarSessaoStorage } from "./validacoes.js";


export const sobreNos = (img, tituloCategoria) => {
  const articleSobreNos = document.createElement("article");

  const headerFeed = document.createElement("header");
  headerFeed.classList.add("item1");
  headerFeed.innerHTML = conteudoHeader();

 /* const secaoExibicaoCategoria = document.createElement('div');
  secaoExibicaoCategoria.classList.add('exibicaoCategoria');
  secaoExibicaoCategoria.innerHTML = secaoDeExibicao(); */

  const navInferior = document.createElement("nav");
  navInferior.classList.add("barraNavegacaoInferior");
  const userData = validarSessaoStorage();
  navInferior.innerHTML = `
        <ul>
        <li class="list">
            <a class="abrirExibicao">
                <span class="icon">
                    <img src="imagens/home2.png">
                </span>
            </a>
        </li>
        <li class="list">
            <a href="#/timeline">
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
  

  const footer = document.createElement("footer");
  footer.classList.add("footerDesktop");
  footer.innerHTML = "By: Amanda Gusmão e Layssa Aragão";

  articleSobreNos.appendChild(headerFeed);
  // articleSobreNos.appendChild(secaoExibicaoCategoria);
  articleSobreNos.appendChild(navInferior);
  articleSobreNos.appendChild(footer);

  return articleSobreNos;
};


//a nav inferior some acima de 1024 x 863 px