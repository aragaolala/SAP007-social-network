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
