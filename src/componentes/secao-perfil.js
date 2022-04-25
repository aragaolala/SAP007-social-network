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
  
// Funcionalidade do botao Eliminar post
export const btnExcluirPost = () => {
    const postsCards = document.getElementsByClassName('usuarioPost');
    Array.from(postsCards).forEach((postCard) => {
      const btnExcluir = postCard.querySelector('.btnDelete');
      btnExcluir.addEventListener('click', async () => {
        const confirmarcao = window.confirm('Deseja mesmo excluir essa publicação?');
        // confirm foi usado para verificar se o usuário queria excluir a postagem
        if (!confirmarcao) {
          // se a confirmação for falsa, não faz nada, do contrário exclui o post
          return;
        }
        const postExcluido = document.getElementById(postCard.id);
        await excluirPost(postCard.id);
        // // console.log('se apago o post');
        // uma vez que a postagem é excluída no firestore, a postagem é excluída na interface
        postExcluido.parentElement.remove();
      });
    });
  };

  / Função que é responsável por editar o post
const editarPost = (postCard) => {