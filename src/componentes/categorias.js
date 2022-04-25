import { mostrarPost } from "./home-mobile.js";
import {
  obterPostsGrupo,
  obterUsuarios,
  obterPeloId,
  subirLikes,
} from "../firebase/funcoesFirestore.js";
import { validarSessaoStorage } from "./validacoes.js";

// Handler: Ações que devem ser executadas quando o usuário clicar em um botão
async function LikeFunctionHandler(e) {
  const btnLike = e.target;
  const userData = JSON.parse(sessionStorage.userSession);

  //  o id do post que está associado ao atributo name é encontrado e salvo no idLike
  const idLike = btnLike.getAttribute("name");
  const contadorLike = btnLike.nextElementSibling;
  const dataPost = await obterPeloId(idLike, "posts");
  // verificando se o id do usuário está na lista de likes de cada post
  if (dataPost.likes.includes(userData.id)) {
    // isto é para remover o like por usuário
    subirLikes(
      idLike,
      dataPost.likes.filter((item) => item !== userData.id)
    );
    contadorLike.textContent = dataPost.likes.length - 1;
    btnLike.style.color = "#8F7D7D";
  } else {
    // isto é para adicionar like por usuário
    subirLikes(idLike, [...dataPost.likes, userData.id]);
    contadorLike.textContent = dataPost.likes.length + 1;
    btnLike.style.color = "#E7B9E4";
  }
}

// Reconhece todos os botões like em cada Publicação
export const btnLikes1 = () => {
  const botoesPost = document.getElementsByClassName("botoesReacao");

  // Procura onde está o alvo de reação, neste caso 'like'
  Array.from(botoesPost).forEach((botaoPost) => {
    const btnLike = botaoPost.querySelector(".like");

    // Reconhece o botão like e contador de likes ao lado
    btnLike.addEventListener("click", LikeFunctionHandler);
  });
};

// Preencher sessão de categorias
const mostrarPostPorCategoria = async (containerPost, grupo) => {
  const userData = JSON.parse(sessionStorage.userSession);
  // Obter dados dos usuários
  const usuarios = await obterUsuarios();
  // Obter os post conforme sua categoria correspondente
  const dadosPost = await obterPostsGrupo(grupo);
  dadosPost.forEach((docs) => {
    // procurar informações do criador de cada post
    const criadorPost = usuarios.filter(
      (user) => user.userId === docs.usuarioId
    );
    containerPost.prepend(mostrarPost(docs.postId, docs, criadorPost[0]));
    // verificando se o id do usuário logado está na lista de likes
    // se funcionar fica rosa
    if (docs.likes.includes(userData.id)) {
      document.getElementsByName(docs.postId)[0].style.color = "#E7B9E4";
    }
  });
  btnLikes1();
};

// Exibindo o conteúdo da categoria
export const conteudoCategoria = (imgsrc, tituloCategoria) => {
    const categoriaSecao = document.createElement("section");
    categoriaSecao.classList.add("item3");
