// Criação da estrutura e design da aparência do logo e slogan nas pags login e registro
export const fundoHome = (divFormulario) => {
  const fundo = `
      <div id="localExibicao"></div>
      <section class="div-logo-slogan">
        <div class="boxInterno1">
          <img src="imagens/pinky-promise.svg" class="left-login-img" alt="powerful woman">
          <img id="Logo" src="imagens/logo.png">
          <p class="slogan">Speak your mind and find support</p>
        </div>
          ${divFormulario}
        </div>    
      </section>
      
      
    `;
};