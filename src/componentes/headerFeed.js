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