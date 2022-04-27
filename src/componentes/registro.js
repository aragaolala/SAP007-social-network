import { registroUsuario, envioEmailVerificacao } from '../firebase/funcoesAuth.js';
import { funcRegistro } from './erros.js';
import { mostrarEOcultarSenha } from './logo-slogan.js';
import { adicionarDataUserFS } from '../firebase/funcoesFirestore.js';

// Criação de formulário de registro
export const formRegistros = () => {
  const formRegistro = `
    <div id='registro' class='boxInterno2'>
      <form id="formRegistro" class="boxLogin">
        <p class="texto">Criar Conta</p>
        <div class="secaoRegistro">
          <input type="text" id="usuarioRegistro" class="dadosIngresso" placeholder="Nome de usuária" required>
          <i class="ph-user"></i>
        </div>
        <div class="secaoRegistro">
          <input type="text" id="emailRegistro" class="dadosIngresso" placeholder="E-mail" required>
          <i class="ph-envelope"></i>
        </div>
        <div class="secaoRegistro">
          <input type="password" id="senhaRegistro" class="dadosIngresso" placeholder="Senha" required>
          <i id="botaoSenha" class="ph-eye-closed"></i>
        </div>
        <div class="secaoCheckbox">
          <input type="checkbox" id="checkRegistro" class="checkRegistro" required/><label class="texto2">Aceito os termos 
          e condições das Políticas de Privacidade.</label>
        </div>
        <button type="submit" class="iniciarSessao">Registrar-se</button> 
        <p class="texto2">Já tem tem uma conta? <a id="registrar-se" href="#/inicio">Iniciar sessão</a></p>
      </form>
      
    </div>
    <footer>By: Amanda Gusmão & Layssa Aragão</footer>`;
  return formRegistro;
};

// Função que se encarrega do registro por email
export const registroEmail = (selectorForm, containerError) => {
  mostrarEOcultarSenha('botaoSenha', 'senhaRegistro'); // função de mostrar e ocultar senha
  const registroComEmail = document.getElementById(selectorForm);
  registroComEmail.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuarioRegistro = document.getElementById('usuarioRegistro').value;
    const emailRegistro = document.getElementById('emailRegistro').value;
    const senhaRegistro = document.getElementById('senhaRegistro').value;
    // aqui chama o container dos modos de erros
    const localExibicao = document.getElementById(containerError);

    registroUsuario(emailRegistro, senhaRegistro)
      .then((userCredential) => {
        const user = userCredential.user;
        // é enviada a mensagem de verificação por email
        envioEmailVerificacao().then(() => {
          adicionarDataUserFS(user.uid, usuarioRegistro, emailRegistro, '', '', 'imagens/imgDoUsuario.png', 'imagens/img-de-capa.png');
        });
        localExibicao.innerHTML = funcRegistro.registroSucesso();
        setTimeout(() => {
          const exibicaoRegistroSucesso = document.getElementById('exibicaoRegistroSucesso');// mostra msg de registro com sucesso
          exibicaoRegistroSucesso.style.display = 'none';
          window.location.hash = '#/inicio';
        }, 5000);
      })
      .catch((error) => {
        // todas as mensagens de erro são definidas
        if (error.message === 'Firebase: Error (auth/invalid-email).') {
          localExibicao.innerHTML = funcRegistro.emailInvalido();
          setTimeout(() => {
            const exibicaoemailInvalido = document.getElementById('exibicaoemailInvalido');
            exibicaoemailInvalido.style.display = 'none';
          }, 5000);
        } else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
          localExibicao.innerHTML = funcRegistro.senhaInvalida();
          setTimeout(() => {
            const exibicaoSenhaInvalida = document.getElementById('exibicaoSenhaInvalida');
            exibicaoSenhaInvalida.style.display = 'none';
          }, 5000);
        } else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
          localExibicao.innerHTML = funcRegistro.emailExistente();
          setTimeout(() => {
            const exibicaoEmailExistente = document.getElementById('exibicaoEmailExistente');
            exibicaoEmailExistente.style.display = 'none';
          }, 5000);
        } else {
          localExibicao.textContent = error.message;
        }
      });
  });
};
