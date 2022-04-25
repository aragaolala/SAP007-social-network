import { conteudoHeader, secaoDeExibicao } from "./headerFeed.js";
import { homeParaDesktop } from "./home-desktop.js";
import { homeMobile } from "./home-mobile.js";
import { conteudoPerfil } from "./secao-perfil.js";
import { conteudoEditarPerfil } from "./editar-perfil.js";
import { conteudoCategoria } from "./categorias.js";

// Render da seção timeline
export const painel = () => {
  const articlePainel = document.createElement("article");
  articlePainel.classList.add("artPainel");
  articlePainel.setAttribute("id", "artPainel");

  const headerFeed = document.createElement("header");
  headerFeed.classList.add("item1");
  headerFeed.innerHTML = conteudoHeader();

  const secaoExibicaoCategoria = document.createElement("div");
  secaoExibicaoCategoria.classList.add("exibicaoCategoria");
  secaoExibicaoCategoria.innerHTML = secaoDeExibicao();

  const divSecoes = document.createElement("div");
  divSecoes.classList.add("grid-container");
  divSecoes.appendChild(homeParaDesktop());
  divSecoes.appendChild(homeMobile());

  articlePainel.appendChild(headerFeed);
  articlePainel.appendChild(secaoExibicaoCategoria);
  articlePainel.appendChild(divSecoes);

  const footer = document.createElement("footer");
  footer.classList.add("footerDesktop");
  footer.innerHTML = "By: Amanda Gusmão e Layssa Aragão";

  articlePainel.appendChild(footer);
  return articlePainel;
};

/ Renderizar a seção de perfil do usuário
export const painelPerfil = () => {
  const articlePainelPerfil = document.createElement('article');
  articlePainelPerfil.classList.add('meuPerfil');
  articlePainelPerfil.setAttribute('id', 'meuPerfil');

  const headerFeed = document.createElement('header');
  headerFeed.classList.add('item1');
  headerFeed.innerHTML = conteudoHeader();

  const secaoExibicaoCategoria = document.createElement('div');
  secaoExibicaoCategoria.classList.add('exibicaoCategoria');
  secaoExibicaoCategoria.innerHTML = secaoDeExibicao();

  const divSecaoPerfilUsuario = document.createElement('div');
  divSecaoPerfilUsuario.classList.add('container-perfil');
  divSecaoPerfilUsuario.appendChild(conteudoPerfil());

  articlePainelPerfil.appendChild(headerFeed);
  articlePainelPerfil.appendChild(secaoExibicaoCategoria);
  articlePainelPerfil.appendChild(divSecaoPerfilUsuario);

  const footer = document.createElement('footer');
  footer.classList.add('footerDesktop');
  footer.innerHTML = 'By: Amanda Gusmão e Layssa Aragão';

  articlePainelPerfil.appendChild(footer);

  return articlePainelPerfil;
};

// Renderizar a seção de perfil do usuário para editar
export const painelEditarPerfil = () => {
    const articlePainelEditarPerfil = document.createElement('article');
    articlePainelEditarPerfil.classList.add('EditarPerfil');
    articlePainelEditarPerfil.setAttribute('id', 'EditarPerfil');

    const headerFeed = document.createElement('header');
  headerFeed.classList.add('item1');
  headerFeed.innerHTML = conteudoHeader();

  const secaoExibicaoCategoria = document.createElement('div');
  secaoExibicaoCategoria.classList.add('exibicaoCategoria');
  secaoExibicaoCategoria.innerHTML = secaoDeExibicao();

  const divSecaoEditarPerfilUsuario = document.createElement('div');
  divSecaoEditarPerfilUsuario.classList.add('container-editarPerfil');
  divSecaoEditarPerfilUsuario.appendChild(conteudoEditarPerfil());

  articlePainelEditarPerfil.appendChild(headerFeed);
  articlePainelEditarPerfil.appendChild(secaoExibicaoCategoria);
  articlePainelEditarPerfil.appendChild(divSecaoEditarPerfilUsuario);