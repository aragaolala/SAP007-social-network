import { conteudoHeader, encerrarSessao } from './headerFeed.js';


export const sobreNos = (divFormulario) => {
    const headerFeed = document.createElement('header');
  headerFeed.classList.add('item1');
  headerFeed.innerHTML = conteudoHeader();
  
    const fundo = `
        <section class="div-logo-slogan">
          <div class="boxInterno1">
            <img src="imagens/pinky-promise.svg" class="left-login-img" alt="powerful woman">
            <img id="Logo" src="imagens/logo.png">
            <p class="slogan">Speak your mind and find support</p>
          </div>
            ${divFormulario}
          </div>    
        </section>
        <div id="localExibicao"></div>
      `;
    const divFundo = document.createElement('article');
    divFundo.setAttribute('id', 'artRegistro');
    divFundo.classList.add('artRegistro');
    divFundo.innerHTML = fundo;
    return divFundo;

    
  };