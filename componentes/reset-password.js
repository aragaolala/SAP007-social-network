import { resetPasswordFirebase } from '../firebase/funcoesAuth.js';

export const resetPass = () => {
  const articlePainel = document.createElement('article');
  articlePainel.classList.add('container-resetpass');

  const headerFeed = document.createElement('header');
  headerFeed.classList.add('container-header');
  headerFeed.innerHTML = `
        <div class="titulo-header1">
            <img src="imagens/logo.png" id="Logo1">
        </div>
    `;

  const infoPass = document.createElement('nav');
  infoPass.classList.add('texto-info');
  infoPass.innerHTML = `
        <form id="resetPasswordBtn">
            <h2 class="slogan">Speak Your Mind and Find Support</h2>
            <div class="box-reset">
                <h2 class="top-reset">Esqueci minha senha</h2>
                <p class="top-reset1">Entre com o e-mail associado a sua conta:</p>
                <div class="input-email">
                    <input type="email" id="resetEmail" class="input-email2" placeholder="Digite seu e-mail"></input>
                    <i class="ph-envelope"></i>
                </div>
                <div class="align-button">
                    <button type="submit" class="button-email">REDEFINIR SENHA</button>
                </div>
                <div class="texto2">
                    <a href="#/inicio">Voltar para a tela de Login</a>
                </div>
            </div>
        </form>

        <section class="msgReset" style="display: none">
            <p class="exibicaoRegistroSucesso">O e-mail de redefinição foi enviado para <b class="emailText"></b>. Caso não tenha recebido, verifique sua caixa de spam ou lixo eletrônico!</p>
        </section>

        <section class="msgErro" style="display: none">
            <p class="exibicaoError">Houve algum erro ao requisitar sua solicitação. Tente novamente mais tarde.</p>
        </section>
    `;

  const footer = document.createElement('footer');
  footer.classList.add('footerDesktop');
  footer.innerHTML = 'By: Amanda Gusmão & Layssa Aragão';

  articlePainel.appendChild(headerFeed);
  articlePainel.appendChild(infoPass);
  articlePainel.appendChild(footer);

  return articlePainel;
};
/*eslint-disable*/
export const handleReset = (e) => {
  e.preventDefault();

  const email = document.querySelector('#resetEmail').value;
  return resetPasswordFirebase(email)
    .then(() => {
      console.log('Reset Password successful');
      document.querySelector('.msgReset').style.display = 'block';
      const emailText = document.querySelector('.emailText');
      emailText.innerHTML = `${email}`;
    })
    .catch((err) => {
      const error = err.code;
      console.log(error);
      document.querySelector('.msgErro').style.display = 'block';
    });
};

export const resetPasswordInit = () => {
  const resetP = document.querySelector('#resetPasswordBtn');

  resetP.addEventListener('submit', handleReset);
};
