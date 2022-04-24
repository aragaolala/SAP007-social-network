import { obterPeloId, obterUsuarios } from "../firebase/funcoesFirestore.js";
import { subirFileStorage } from "../firebase/funcoesStorage.js";

// Mostrar todos os posts
export const mostrarPost = (idPost, dataPost, dataCriador) => {
  const divPainel = document.createElement('div');
  divPainel.classList.add('painelPost');

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
          <p>${dataPost.publicacao }</p>
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

