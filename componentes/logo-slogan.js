// Criação da estrutura e design da aparência do logo e slogan nas pags login e registro
export const fundoHome = (divFormulario) => {
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

// Botão para mostrar e ocultar senha
export const mostrarEOcultarSenha = (botaoOcultarSenha, idInput) => {
  const botaoSenha = document.getElementById(botaoOcultarSenha);
  const chave = document.querySelector(`input[id=${idInput}]`);
  botaoSenha.addEventListener('click', () => {
    const type = chave.getAttribute('type') === 'password' ? 'text' : 'password';
    chave.setAttribute('type', type);
    botaoSenha.classList.toggle('ph-eye');
    botaoSenha.classList.toggle('ph-eye-closed');
  });
};
