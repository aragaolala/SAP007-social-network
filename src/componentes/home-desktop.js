import { validarSessaoStorage } from './validacoes.js';

// Renderização da seção de dados do usuário e categorias de versão desktop
export const homeParaDesktop = () => {
    const secaoDesktop = document.createElement('section');
    secaoDesktop.classList.add('item2');