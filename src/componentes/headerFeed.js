import { encerrarAtividadeUsuario } from "../firebase/funcoesAuth.js";

// Renderizando o header
export const conteudoHeader = () => {
    // const userData = validarSessaoStorage();
    const headerFeed = `
          <div class="titulo-header">
              <img src="imagens/logo.png" id="Logo">
          </div>
          <div class="pontosVerticais">
            <figure></figure>
            <figure class="middle"></figure>
            <p class="sair"></p>
            <figure></figure>
            <ul class="dropDown">
              <li><a href='#/timeline'><img id="img-encerrar" src="imagens/home.png"><span>Início</span></a></li>
              <li><a href='#/meuperfil'><img id="img-encerrar" src="imagens/do-utilizador.png"><span>Meu Perfil</span></a></li>
              <li><a href='#/editarperfil'><img id="img-encerrar" src="imagens/configuracoes.png"><span>Configurações</span></a></li>
              <li><a id="encerrar-sessao"><img id="img-encerrar" src="imagens/sign-out.png"><span>Sair</span></a></li>
            </ul>
          </div>
        `;
    return headerFeed;
  };

// Função do botão encerrar sessão, limpando o sessionStorage
// volta ao inicio
export const encerrarSessao = () => {
    const botaoSair = document.getElementById("encerrar-sessao");
    botaoSair.addEventListener("click", () => {
      encerrarAtividadeUsuario()
        .then(() => {
          sessionStorage.clear();
          window.location.hash = "#/inicio";
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    });
  };

  // Funcionalidade do menu hamburguer - encerrar sessão
export const menuHamburguerHeader = () => {
    const menuHambHeader = document.querySelector(".menuHambHeader");
    const middle = document.querySelector(".middle");
    const sair = document.querySelector(".sair");
    const dropDown = document.querySelector(".dropDown");
  
    menuHambHeader.addEventListener("click", () => {
      middle.classList.toggle("active");
      sair.classList.toggle("active");
      dropDown.classList.toggle("active");
    });
  };

  // Exibindo categorias
export const secaoDeExibicao = () => {
    const secaoExibicaoCategoria = `<section class="secaoDeExibicao">
      <div class="tituloExibicao">
        <h1>Tema</h1>
        <span class="btnEncerrar">&times;</span>
      </div>
      <div class= "containerCategorias">
          <a href="#/relacionamentos" class="categoriaUnica">
              <img src="imagens/coracoes.png" >
              <p>Relacionamento</p>
          <a>
          <a href="#/web" class="categoriaUnica">
              <img src="imagens/codigo.png" >
              <p>Web</p>
          </a>
          <a href="#/saude" class="categoriaUnica">
              <img src="imagens/saude.png" >
              <p>Saúde</p>
          </a>
          <a href="#/viagens" class="categoriaUnica">
              <img src="imagens/aviao.png" >
              <p>Viagens</p>
          </a>
          <a href="#/amizades" class="categoriaUnica">
              <img src="imagens/pulseira.png" >
              <p>Amizade</p>
          </a>
          <a href="#/moda" class="categoriaUnica">
              <img src="imagens/cabide.png" >
              <p>Moda/Beleza</p>
          </a>
          <a href="#/estudos" class="categoriaUnica">
              <img src="imagens/open-book.png" >
              <p>Estudos</p>
          </a>
          <a href="#/maternidade" class="categoriaUnica">
              <img src="imagens/bebe.png" >
              <p>Maternidade</p>
          </a>
          <a href="#/outros" class="categoriaUnica">
              <img src="imagens/more.png" >
              <p>Outros</p>
          </a>
      </div>
      </section>`;
    return secaoExibicaoCategoria;
  };

  // funcionalidade do exibicao categorias
export const exibicaoCategorias = () => {
    const exibicaoCategoria = document.querySelector(".exibicaoCategoria");
    const abrirExibicao = document.querySelector(".abrirExibicao");
    const btnEncerrar = document.querySelector(".btnEncerrar");
  
    abrirExibicao.addEventListener("click", () => {
      exibicaoCategoria.style.display = "block";
    });
  
    btnEncerrar.addEventListener("click", () => {
      exibicaoCategoria.style.display = "none";
    });

    /* outside click */
  window.addEventListener("click", (e) => {
    // eslint-disable-next-line
    if (e.target == exibicaoCategoria) {
      exibicaoCategoria.style.display = "none";
    }
  });
};
