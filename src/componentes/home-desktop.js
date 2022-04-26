import { validarSessaoStorage } from "./validacoes.js";

// Renderização da seção de dados do usuário e categorias de versão desktop
export const homeParaDesktop = () => {
  const secaoDesktop = document.createElement("section");
  secaoDesktop.classList.add("item2");
  const userData = validarSessaoStorage();
  // const userData = JSON.parse(sessionStorage.userSession);
  secaoDesktop.innerHTML = `
        <section class="secUsuario">
            <div class="containerCapaDeFundo">
                <img src="${userData.imgCapa}">
            </div>  
            <div class="containerPerfil">
                <a href="#/meuperfil">
                    <img src="${userData.imgUsuario}">
                </a>
                <div class="dadosUsuario">
                    <p class="nomeUsuario">${userData.username}</p>
                    <p class="pronomeUsuario">${userData.pronomes}</p>
                    <p class="localUsuario">${userData.local}</p>
                </div>
            </div>
        </section>         
        <section class="secaoCategorias">
        <h1>Tema</h1>
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
        </section>       
    `;

  const footer = document.createElement('footer');
  footer.classList.add('footerDesktop');
  footer.innerHTML = 'By: Amanda Gusmão e Layssa Aragão';

  secaoDesktop.appendChild(footer);

  return secaoDesktop;
};
