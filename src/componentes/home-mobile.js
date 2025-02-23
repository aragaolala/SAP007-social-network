import {
  obterPosts,
  obterPeloId,
  subirPosts,
  subirLikes,
  obterUsuarios,
  subirComments,
} from '../firebase/funcoesFirestore.js';
import { subirFileStorage } from '../firebase/funcoesStorage.js';

// Mostrar todos os posts
export const mostrarPost = (idPost, dataPost, dataCriador, usuarios) => {
  const divPainel = document.createElement('div');
  divPainel.classList.add('painelPost');
  divPainel.setAttribute('id', idPost);

  const comentarios = dataPost.comments.reverse().map((comentario) => {
    let criadorComentario = usuarios.find(
      (user) => user.userId === comentario.usuarioId,
    );

    if (!criadorComentario) {
      criadorComentario = {};
    }
    return `
      <div class="postComentario">
        <p class="ph-sparkle" class="userComentario">${criadorComentario.username}</p>
        <p class="conteudoComentario">${comentario.comment}</p>
      </div>    
    `;
  }).join('');

  divPainel.innerHTML = `
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
    <i class="ph-heart-straight-fill like" name= "${idPost}"}></i>
    <p>${dataPost.likes.length}</p>
    <i class="ph-chat-centered-dots comment" name= "${idPost}"}></i>
    <p>${dataPost.comments.length}</p>
  </div>
  <section class="exibicaoComentarios comentarioModal-${idPost}" style="display: none">
    <form id="formComentario" class="painelComentario">
      <span class="btnFechar">&times;</span>
      <textarea id="inputComentario" placeholder="O que gostaria de comentar?" rows="2" cols="70"></textarea>  
      <div class="botoes">
        <button id="botaoComentario">Enviar</button> 
      </div>
    </form>
    <div class="postComentarios">
      ${comentarios}
    </div>
  </section>
  `;

  return divPainel;
};

// Simula o contador no Firestore como array de usuários que dão click
export const handleLikes = async (e) => {
  const btnLike = e.target;
  const userData = JSON.parse(sessionStorage.userSession);
  // o id do post que está associado ao atributo name é encontrado e salvo no idLike
  const idLike = btnLike.getAttribute('name');
  const dataPost = await obterPeloId(idLike, 'posts');
  // verificando se o id do usuário está na lista de likes de cada post
  if (dataPost.likes.includes(userData.id)) {
    // isto é para remover o like por usuário
    subirLikes(
      idLike,
      dataPost.likes.filter((item) => item !== userData.id),
    );
    btnLike.style.color = '#8F7D7D';
  } else {
    // isto é para adicionar like por usuário
    subirLikes(idLike, [...dataPost.likes, userData.id]);
    btnLike.style.color = '#E7B9E4';
  }
};

// Simula o contador no Firestore como array de usuários que dão click
export const handleComments = async (e) => {
  const btnComment = e.target;
  // const userData = JSON.parse(sessionStorage.userSession);
  // o id do post que está associado ao atributo name é encontrado e salvo no idPost
  const idPost = btnComment.getAttribute('name');
  document.querySelector(`.comentarioModal-${idPost}`).style.display = 'block';
  // const contadorComment = btnComment.nextElementSibling;
  // contadorComment.textContent = dataPost.comments.length + 1;
  // o número de comentários antigos + 1
};

// Funcionalidade para a Criação de comentários
export const criacaoComentario = (idPost) => {
  const formComentario = document.querySelector(`.comentarioModal-${idPost} #formComentario`);

  formComentario.addEventListener('submit', async (e) => {
    e.preventDefault();

    // obter o campo txt do formulário
    const postComentario = e.target.querySelector('#inputComentario').value;

    // JSON.parse()recebe uma string JSON e a transforma em um objeto JavaScript
    const userData = JSON.parse(sessionStorage.userSession);

    const dataPost = await obterPeloId(idPost, 'posts');

    const comment = {
      comment: postComentario,
      usuarioId: userData.id,
    };

    // isto é para adicionar o comentário
    subirComments(idPost, [...dataPost.comments, comment]);

    e.target.reset();
  });

  // Botão para fechar o modal de comentários
  const btnFechar = document.querySelector('.btnFechar');

  btnFechar.addEventListener('click', () => {
    document.querySelector(`.comentarioModal-${idPost}`).style.display = 'none';
  });
};

// Reconhece todos os botões like em cada Publicação
export const btnLikes = () => {
  const botoesPost = document.getElementsByClassName('botoesReacao');

  // Procura onde está o alvo de reação neste caso 'like'
  Array.from(botoesPost).forEach((botaoPost) => {
    const btnLike = botaoPost.querySelector('.like');
    const btnComment = botaoPost.querySelector('.comment');

    // Reconhece o botão
    btnLike.addEventListener('click', handleLikes);
    btnComment.addEventListener('click', handleComments);
  });
};

// Mostrar todos os posts na timeline principal
const preencherHome = async (containerPost) => {
  const userData = JSON.parse(sessionStorage.userSession);
  const usuarios = await obterUsuarios();
  await obterPosts((querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (window.location.hash === '#/timeline') {
        const criadorPost = usuarios.filter(
          (user) => user.userId === change.doc.data().usuarioId,
        );

        if (change.type === 'added') {
          // console.log(criadorPost[0]);
          containerPost.prepend(
            mostrarPost(change.doc.id, change.doc.data(), criadorPost[0], usuarios),
          );

          if (change.doc.data().likes.includes(userData.id)) {
            document.getElementsByName(change.doc.id)[0].style.color = '#E7B9E4';
          }
          btnLikes();
          criacaoComentario(change.doc.id);
        }

        if (change.type === 'modified') {
          const postAtualizado = mostrarPost(change.doc.id, change.doc.data(), criadorPost[0], usuarios);

          const postAntigo = document.querySelector(`.painelPost[id="${change.doc.id}"`);
          // salva se o modal estava aberto ou fechado e aplica de novo
          postAtualizado.querySelector('.exibicaoComentarios').style.display = postAntigo.querySelector('.exibicaoComentarios').style.display;
          postAntigo.innerHTML = postAtualizado.innerHTML;
          
          const btnLike = document.getElementsByName(change.doc.id);
          const irmaoBtnLike = btnLike[0].nextElementSibling;
          irmaoBtnLike.textContent = change.doc.data().likes.length;

          if (change.doc.data().likes.includes(userData.id)) {
            document.getElementsByName(change.doc.id)[0].style.color = '#E7B9E4';
          }

          btnLikes();
          criacaoComentario(change.doc.id);
        }
      }
    });
  });
};

// A propriedade nextElementSibling retorna o elemento imediatamente após
// o elemento especificado, no mesmo nível da árvore.

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
  const painelCompartilhar = document.createElement('form');
  painelCompartilhar.setAttribute('id', 'formCompartilhar');
  painelCompartilhar.classList.add('painelCompartilhar');
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

  const containerPublicacoes = document.createElement('div');
  containerPublicacoes.classList.add('container-post');
  containerPublicacoes.setAttribute('id', 'container-post');
  preencherHome(containerPublicacoes);

  secaoMobile.appendChild(navInferior);
  secaoMobile.appendChild(painelCompartilhar);
  secaoMobile.appendChild(containerPublicacoes);
  return secaoMobile;
};

// Funcionalidade para a Criação de posts com texto e/ou imagem
export const criacaoPost = (formCompartilhar) => {
  const divCompartilhar = document.getElementById(formCompartilhar);

  divCompartilhar.addEventListener('submit', async (e) => {
    e.preventDefault();
    // escolha da categoria / tema onde o usuario quer subir o post
    const selectCategoria = e.target.querySelector('#Grupo');
    const categoria = selectCategoria.options[selectCategoria.selectedIndex].value;

    // Escolha do arquivo que o usuário deseja enviar para o post
    const arquivoLocal = e.target.querySelector('#compartilharImg').files[0];

    // obter o campo txt do formulário (falta validar o formulário, atenção!)
    const postTxt = e.target.querySelector('#inputCompartilhar').value;

    // JSON.parse()recebe uma string JSON e a transforma em um objeto JavaScript
    const userData = JSON.parse(sessionStorage.userSession);

    if (arquivoLocal === undefined) {
      // se nenhum arquivo é selecionado, é enviado vazio
      await subirPosts(userData.id, postTxt, categoria, '');
    } else {
      // obtenção do url do arquivo carregado do storage
      const urlImagem = await subirFileStorage(arquivoLocal, 'imgPosts');
      await subirPosts(userData.id, postTxt, categoria, urlImagem);
    }
    e.target.reset();
  });
};
