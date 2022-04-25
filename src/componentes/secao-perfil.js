import {
    obterUserPosts, eliminarPost, atualizarPost, obterUsuarios,
  } from '../firebase/funcoesFirestore.js';
  import { btnLikes1 } from './categorias.js';
  import { validarSessaoStorage } from './validacoes.js';

  // Render do post conforme usuario
const postsUsuario = (idPost, dataCriador, dataPost) => {
    const divPost = document.createElement('div');
    divPost.classList.add('painelPost');
  