import {
    obterUserPosts, eliminarPost, atualizarPost, obterUsuarios,
  } from '../firebase/funcoesFirestore.js';
  import { btnLikes1 } from './categorias.js';
  import { validarSessaoStorage } from './validacoes.js';

  // Render do post conforme usuario
const postsUsuario = (idPost, dataCriador, dataPost) => {
    const divPost = document.createElement('div');
    divPost.classList.add('painelPost');

    divPost.innerHTML = `
    <div class="usuarioPost" id="${idPost}">
        <div class="imgUsuarioPost"><img class="imgPost"src="${dataCriador.imgUsuario}"></div>
        <div class="infoUsuarioPost">
            <div class="nomeUsuarioPost"><p>${dataCriador.username}</p></div>
            <div class="descricaoUsuarioPost"><p>${dataCriador.pronomes}</p></div>
        </div>
        <button class="btnEdit"><img src="imagens/edit.png"></button>
        <button class="btnDelete"><img src="imagens/delete.png"></button>
    </div>
    <div class="postsCompartilhado">
        <div class="conteudoCompartilhado">
            <p class="postcontent">${dataPost.publicacao }</p>
            <img src="${dataPost.imgPost}">
        </div>
    </div>
    <div class="botoesReacao">
        <i class="ph-heart-bold like" name= "${idPost}"}></i>
        <p>${dataPost.likes.length}</p>
        <i class="ph-chat-circle" name= "${idPost}"}></i>
        <p>${dataPost.likes.length}</p>        
    </div>
    `;
  return divPost;
};
  