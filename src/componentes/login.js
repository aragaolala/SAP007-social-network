import {
  loginUsuario,
  googleInicioSessao,
  encerrarAtividadeUsuario,
} from '../firebase/funcoesAuth.js';
import { provedor, GoogleAuthProvider } from '../firebase/config.js';
import { modoInicioSecao } from './erros.js';
import { mostrarEOcultarSenha } from './logo-slogan.js';
import {
  obterPeloId,
  adicionarUsuarioGoogle,
  searchUser,
} from '../firebase/funcoesFirestore.js';

// Criação do formulário de login
export const formInicioSessao = () => {
  const formDeLogin = `
        <div id="inicio" class="boxInterno2">
            <form id="formDeLogin" class="boxLogin">
                <p class="texto">Olá, de novo!</p>
                <div class="secaoRegistro">
                    <input type="text" id="emailLogin" class="dadosRegistro" placeholder="E-mail" required>
                    <i class="ph-envelope"></i>
                </div>
                <div class="secaoRegistro">
                    <input type="password" id="senhaLogin" class="dadosRegistro" placeholder="Senha" required>
                    <i id="botaoSenha" class="ph-eye-closed"></i>
                </div>
                <div class="texto2">
                  <a id="resetPass" href="#/resetpassword">Esqueceu sua senha?</a>
                </div>
                <button type="submit" id="botaoDeLogin" class="iniciarSessao">Login</button>
                 <p class="texto2">Ou faça login com o Google</p>
                 <p class="texto2"><img id="imgGoogle" src="imagens/GoogleOriginal.png"></p>
                <p class="texto2">Não tem uma conta?<a id="registrar-se" href="#/registro"> Registre-se</a></p>
            </form>
             
        </div>
        <footer>By: Amanda Gusmão & Layssa Aragão</footer>`;
  return formDeLogin;
};

// Função que se encarrega do inicio de Sessão por email
export const login = (selectorForm, containerError) => {
  mostrarEOcultarSenha('botaoSenha', 'senhaLogin'); // função de mostrar e ocultar senha
  encerrarAtividadeUsuario(); // vê que não há atividade de usuário
  sessionStorage.clear(); // limpa o Storage
  const iniciarCon = document.getElementById(selectorForm);
  iniciarCon.addEventListener('submit', (e) => {
    e.preventDefault(); // faz com que o formulario nao atualize - refresh
    const emailLogin = document.getElementById('emailLogin').value;
    const senhaLogin = document.getElementById('senhaLogin').value;
    // aqui chama o container com os erros
    const localExibicao = document.getElementById(containerError);

    loginUsuario(emailLogin, senhaLogin)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified === true) {
          // obter dados do usuário logado para adicionar à sessionStorage
          obterPeloId(user.uid, 'usuarios').then((data) => {
            const dataa = data;
            dataa.id = user.uid;
            sessionStorage.setItem('userSession', JSON.stringify(dataa));
            window.location.hash = '#/timeline';
          });
        } else {
          // mostra mensagem de erro se nao verifico por email
          localExibicao.innerHTML = modoInicioSecao.confirmar();
          setTimeout(() => {
            const exibicoes = document.getElementById('exibicaoConfirmar');
            exibicoes.style.display = 'none';
          }, 5000);
        }
      })
      .catch((error) => {
        // todas as mensagens de erro são definidas
        if (
          error.message === 'Firebase: Error (auth/invalid-email).'
          || error.message === 'Firebase: Error (auth/wrong-password).'
        ) {
          localExibicao.innerHTML = modoInicioSecao.dadosInvalidos();
          setTimeout(() => {
            const exibicoes = document.getElementById('exibicaoDadosInvalidos');
            exibicoes.style.display = 'none';
          }, 5000);
        } else if (error.message === 'Firebase: Error (auth/user-not-found).') {
          localExibicao.innerHTML = modoInicioSecao.usuarioInvalido();
          setTimeout(() => {
            const exibicoes = document.getElementById('exibicaoUsuarioInvalido');
            exibicoes.style.display = 'none';
          }, 5000);
        } else {
          localExibicao.textContent = 'Ocorreu um erro';
        }
      });
  });

  // inicio sessão com provedor google
  const botaoGoogle = document.getElementById('imgGoogle');
  botaoGoogle.addEventListener('click', () => {
    sessionStorage.clear();
    googleInicioSessao(provedor)
      .then((result) => {
        const googleUser = result.user;
        searchUser(result.user.uid).then((user) => {
          if (user.exists()) {
            const data = user.data();
            data.id = googleUser.uid;
            sessionStorage.setItem('userSession', JSON.stringify(data));
            window.location.hash = '#/timeline';
            return;
          }
          adicionarUsuarioGoogle(googleUser.uid, googleUser).then(() => {
            const data = {
              email: googleUser.email,
              username: googleUser.displayName,
              id: googleUser.uid,
              pronomes: '',
              local: ' ',
              imgUsuario: googleUser.photoURL,
              imgCapa: 'imagens/img-de-capa.png',
            };
            // adicionado dados ao sessionStorage
            sessionStorage.setItem('userSession', JSON.stringify(data));
            window.location.hash = '#/timeline';
          });
        });
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        // eslint-disable-next-line no-console
        console.log(credential);
      });
  });
};