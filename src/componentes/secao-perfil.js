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
    // renderizando o formulário necessário para inserir os dados que serão alterados
  const formularioEditar = document.createElement('form');
  formularioEditar.classList.add('editForm');
  formularioEditar.innerHTML = `
    <textarea id="inputEditar" name="inputEditar" rows="5" cols="33"></textarea>    
    <div class="secBtnEditarPost">
        <button class="botaoSalvarMudancas">Salvar</button>
        <button class="botaoCancelarMudancas">Cancelar</button>  
    </div>
  `;
  const botaoSalvarMudancas = formularioEditar.querySelector('.botaoSalvarMudancas');
  const botaoCancelarMudancas = formularioEditar.querySelector('.botaoCancelarMudancas');
  const postsCompartilhado = postCard.querySelector('.postsCompartilhado');

  const conteudoCompartilhado = postsCompartilhado.firstElementChild;
  formularioEditar.firstElementChild.value = conteudoCompartilhado.firstElementChild.textContent;

  // exclui o texto e adiciona o formulário de edição
  postsCompartilhado.innerHTML = '';
  postsCompartilhado.appendChild(formularioEditar);
  // formulário tem dois botões para salvar ou cancelar as alterações
  botaoCancelarMudancas.addEventListener('click', (e) => {
    e.preventDefault();
    postsCompartilhado.innerHTML = '';
    postsCompartilhado.appendChild(conteudoCompartilhado);
  });

  botaoSalvarMudancas.addEventListener('click', (e) => {
    e.preventDefault();
    const postId = postCard.firstElementChild.id;
    const form = e.target.parentElement.parentElement;
    const postAtualizado = form.firstElementChild.value;
    atualizarPost(postId, postAtualizado)
      .then(() => {
        // console.log('aqui sabemos se funfou');
        conteudoCompartilhado.firstElementChild.textContent = postAtualizado;
        postsCompartilhado.innerHTML = '';
        postsCompartilhado.appendChild(conteudoCompartilhado);
      });
  });
};

// Funcionalidade do botão editar postagem
export const btnEditarPost = () => {
    const postsCards = document.getElementsByClassName('painelPost');
    Array.from(postsCards).forEach((postCard) => {
      const btnPencil = postCard.querySelector('.btnEdit');
      btnPencil.addEventListener('click', async () => {
        editarPost(postCard);
      });
    });
  };

  // Função para fazer upload (carregar) da postagem por usuário para sua sessão de perfil
const preencherPerfil = async (containerPost) => {
    const userData = JSON.parse(sessionStorage.userSession);
    const usuarios = await obterUsuarios();
    const dadosPost = await obterUserPosts();