import { mostrarPost } from './home-mobile.js';
import {
  obterPostsGrupo,
  obterUsuarios,
  obterPeloId,
  subirLikes,
  subirComments,
} from '../firebase/funcoesFirestore.js';
import { validarSessaoStorage } from './validacoes.js';
import { serverTimestamp } from '../firebase/config.js';

// Handler: Ações que devem ser executadas quando o usuário clicar em um botão
async function LikeFunctionHandler(e) {
  const btnLike = e.target;
  const userData = JSON.parse(sessionStorage.userSession);

  //  o id do post que está associado ao atributo name é encontrado e salvo no idLike
  const idLike = btnLike.getAttribute('name');
  const contadorLike = btnLike.nextElementSibling;
  const dataPost = await obterPeloId(idLike, 'posts');
  // verificando se o id do usuário está na lista de likes de cada post
  if (dataPost.likes.includes(userData.id)) {
    // isto é para remover o like por usuário
    subirLikes(
      idLike,
      dataPost.likes.filter((item) => item !== userData.id),
    );
    contadorLike.textContent = dataPost.likes.length - 1;
    btnLike.style.color = '#8F7D7D';
  } else {
    // isto é para adicionar like por usuário
    subirLikes(idLike, [...dataPost.likes, userData.id]);
    contadorLike.textContent = dataPost.likes.length + 1;
    btnLike.style.color = '#E7B9E4';
  }
}

// Handler: Ações que devem ser executadas quando o usuário clicar em um botão
async function CommentFunctionHandler(e) {
  const btnComment = e.target;
  const userData = JSON.parse(sessionStorage.userSession);

  // o id do post que está associado ao atributo name é encontrado e salvo no idComment
  const idComment = btnComment.getAttribute('name');
  const contadorComment = btnComment.nextElementSibling;
  const dataPost = await obterPeloId(idComment, 'posts');
  
  const comment = {
    comment: 'Olá, mundo',
    // timestamp: serverTimestamp(),
    usuarioId: userData.id,
  };

  // const comentariosAntigos = dataPost.comments || [];// uso a validação de || para usar uma array vazia se nao tiver comentários no post
  
  // isto é para adicionar o comentário
  subirComments(idComment, [...dataPost.comments, comment]);
  contadorComment.textContent = dataPost.comments.length + 1; //o número de comentários antigos + 1
}

// Reconhece todos os botões like em cada Publicação
export const btnLikes1 = () => {
  const botoesPost = document.getElementsByClassName('botoesReacao');

  // Procura onde está o alvo de reação, neste caso 'like'
  Array.from(botoesPost).forEach((botaoPost) => {
    const btnLike = botaoPost.querySelector('.like');
    const btnComment = botaoPost.querySelector('.comment');

    // Reconhece o botão like e contador de likes ao lado
    btnLike.addEventListener('click', LikeFunctionHandler);
    btnComment.addEventListener('click', CommentFunctionHandler);
  });
};

// Preencher sessão de categorias
const mostrarPostPorCategoria = async (containerPost, grupo) => {
  const userData = JSON.parse(sessionStorage.userSession);
  // Obter dados dos usuários
  const usuarios = await obterUsuarios();
  // Obter os post com a categoria que corresponde ao grupo de parametro
  const dadosPost = await obterPostsGrupo(grupo);
  dadosPost.forEach((docs) => {
    // procurar informações do criador de cada post
    const criadorPost = usuarios.filter(
      (user) => user.userId === docs.usuarioId,
    );
    containerPost.prepend(mostrarPost(docs.postId, docs, criadorPost[0]));
    // verificando se o id do usuário logado está na lista de likes
    // se funcionar fica rosa
    if (docs.likes.includes(userData.id)) {
      document.getElementsByName(docs.postId)[0].style.color = '#E7B9E4';
    }
  });
  btnLikes1();
};

// Exibindo o conteúdo da categoria
export const conteudoCategoria = (imgsrc, tituloCategoria) => {
  const categoriaSecao = document.createElement('section');
  categoriaSecao.classList.add('item3');

  const navInferior = document.createElement('nav');
  navInferior.classList.add('barraNavegacaoInferior');
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
  const divCategoriaMaisBtn = document.createElement('div');
  divCategoriaMaisBtn.setAttribute('id', 'tituloCategoria');
  divCategoriaMaisBtn.innerHTML = `
    <div class="categoriaUnica">
        <img src=${imgsrc}>
        <p>${tituloCategoria}</p>
    </div>
    `;
  const containerPostTema = document.createElement('div');
  containerPostTema.classList.add('container-post');
  containerPostTema.setAttribute('id', 'container-post');
  mostrarPostPorCategoria(containerPostTema, tituloCategoria);

  categoriaSecao.appendChild(navInferior);
  categoriaSecao.appendChild(divCategoriaMaisBtn);
  categoriaSecao.appendChild(containerPostTema);

  return categoriaSecao;
};
