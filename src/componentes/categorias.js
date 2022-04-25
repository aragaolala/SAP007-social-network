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
