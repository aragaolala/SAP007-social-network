import {
    obterPosts, obterPeloId, subirDataHomeCol, subirLikes, obterUsuarios,
  } from '../firebase/funcoesFirestore.js';
  import { subirFileStorage } from '../firebase/funcoesStorage.js';

// Mostrar todos os posts
export const mostrarPost = (idPost, dataPost, dataCriador) => {
  const divPainel = document.createElement("div");
  divPainel.classList.add("painelPost");

  divPainel.innerHTML = divPainel.innerHTML = `
  <div class="usuarioPost" id= "${idPost}">
      <div class="imgUsuarioPost"><img class="imgPost"src="${dataCriador.imgUsuario}"></div>
      <div class="infoUsuarioPost">
          <div class="nomeUsuarioPost"><p>${dataCriador.username}</p></div>
          <div class="descricaoUsuarioPost"><p>${dataCriador.pronomes}</p></div>
      </div>
  </div>
  <div class="postsCompartilhado">
      <div class="conteudoCompartilhado">
          <p>${dataPost.publicacao}</p>
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

  return divPainel;
};

// Simula o contador no Firestore como array de usuários que dão click
export const handleLikes = async (e) => {
  const btnLike = e.target;
  const userData = JSON.parse(sessionStorage.userSession);
  // o id do post que está associado ao atributo name é encontrado e salvo no idLike
  const idLike = btnLike.getAttribute("name");
  const dataPost = await obterPeloId(idLike, "posts");
  // verificando se o id do usuário está na lista de likes de cada post
  if (dataPost.likes.includes(userData.id)) {
    // isto é para remover o like por usuário
    subirLikes(
      idLike,
      dataPost.likes.filter((item) => item !== userData.id)
    );
    btnLike.style.color = "#8F7D7D";
  } else {
    // isto é para adicionar like por usuário
    subirLikes(idLike, [...dataPost.likes, userData.id]);
    btnLike.style.color = "#E7B9E4";
  }
};

// Reconhece todos os botões like em cada Publicação
export const btnLikes = () => {
  const botoesPost = document.getElementsByClassName("botoesReacao");

  // Procura onde está o alvo de reação neste caso 'like'
  Array.from(botoesPost).forEach((botaoPost) => {
    const btnLike = botaoPost.querySelector(".like");

    // Reconhece o botão
    btnLike.addEventListener("click", handleLikes);
  });
};

// Mostrar todos os posts na timeline principal
const preencherHome = async (containerPost) => {
    const userData = JSON.parse(sessionStorage.userSession);
    const usuarios = await obterUsuarios();
    await obterPosts((querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (window.location.hash === '#/timeline') {
          if (change.type === 'added') {
            const criadorPost = usuarios
              .filter((user) => user.userId === change.doc.data().usuarioId);
            // console.log(criadorPost[0]);
            containerPost.prepend(mostrarPost(change.doc.id, change.doc.data(), criadorPost[0]));
  
            if (change.doc.data().likes.includes(userData.id)) {
              document.getElementsByName(change.doc.id)[0].style.color = '#E7B9E4';
            }
            btnLikes();
          }
          if (change.type === 'modified') {
            const btnLike = document.getElementsByName(change.doc.id);
            const irmaoBtnLike = btnLike[0].nextElementSibling;
            irmaoBtnLike.textContent = change.doc.data().likes.length;
            btnLikes();
          }
          if (change.type === 'removed') {
            /* const postEliminado = document.getElementById(change.doc.id);
            postEliminado.parentElement.remove(); */
          }
        }
      });
    });
  };


  // Renderizando Barra de Navegação Inferior, Painel de Compartilhamento e Container Categorias
export const homeMobile = () => {
    const secaoMobile = document.createElement('section');
    secaoMobile.classList.add('item3');

    const navInferior = document.createElement('nav');
  navInferior.classList.add('barraNavegacaoInferior');
  const userData = JSON.parse(sessionStorage.userSession);
  navInferior.innerHTML = `
    <ul>
    <li class="list">
        <a class="abrirExibicao">
            <span class="icon">
                <img src="imagens/users-three.png">
            </span>
        </a>
    </li>
    <li class="list">
        <a href="#/timeline">
            <span class="icon">
                <img src="imagens/house-fill.png">
            </span>
        </a>
    </li>
    <li class="list">
        <a href="#/meuperfil">
            <span class="icon">
                <img src="${userData.imgUsuario}">
            </span>
        </a>
    </li>
    </ul>
    `;
const painelCompartilhar = document.createElement("form");
painelCompartilhar.setAttribute("id", "formCompartilhar");
painelCompartilhar.classList.add("painelCompartilhar");
painelCompartilhar.innerHTML = `
    <textarea id="inputCompartilhar" placeholder="O que gostaria de compartilhar?" rows="8" cols="76"></textarea>  
    
    <div class="botoes">
        <input type="file" placeholder="Adicionar imagem" id="compartilharImg">         
        <select name="Grupo" id="Grupo" class="Grupo">
          <option value="" selected disabled>Tema</option>
          <option value="Relacionamentos">Relacionamento</option>
          <option value="Web">Web</option>
          <option value="Saúde">Saúde</option>
          <option value="Viagens">Viagens</option>
          <option value="Amizade">Amizade</option>
          <option value="Moda">Moda/Beleza</option>
          <option value="Estudos">Estudos</option>
          <option value="Maternidade">Maternidade</option>
          <option value="Outros">Outros</option>
        </select>
        <button class="botaoCompartilhar">Publicar</button>
          
    </div>
  `;

  const containerExibicaoCategorias = document.createElement('div');
  containerExibicaoCategorias.classList.add('categorias-container');
  containerExibicaoCategorias.setAttribute('id', 'categoriasContainer');
