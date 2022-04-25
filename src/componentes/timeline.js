import { conteudoHeader, secaoDeExibicao } from './headerFeed.js';
import { homeParaDesktop } from './home-desktop.js';
import { homeMobile } from './home-mobile.js';
import { conteudoPerfil } from './secao-perfil.js';
import { conteudoEditarPerfil } from './editar-perfil.js';
import { conteudoCategoria } from './categorias.js';

// Render da seção timeline
export const painel = () => {
    const articlePainel = document.createElement('article');
    articlePainel.classList.add('artPainel');
    articlePainel.setAttribute('id', 'artPainel');

    const headerFeed = document.createElement('header');
  headerFeed.classList.add('item1');
  headerFeed.innerHTML = conteudoHeader();

  const secaoExibicaoCategoria = document.createElement('div');
  secaoExibicaoCategoria.classList.add('exibicaoCategoria');
  secaoExibicaoCategoria.innerHTML = secaoDeExibicao();
