import {
    loginUsuario,
    googleInicioSessao,
    encerrarAtividadeUsuario,
  } from "../firebase/funcoesAuth.js";
  import { provedor, GoogleAuthProvider } from "../firebase/config.js";
  import { modoInicioSecao } from "./erros.js";
  import { mostrarEocultarSenha } from "./logo-slogan.js";


// Criação do formulário de login
export const formInicioSessao = () => {
  const formIngresso = `
        <div id="inicio" class="boxInterno2">
            <form id="formIngresso">
                <p class="texto">Olá, de novo!</p>
                <div class="secaoRegistro">
                    <input type="text" id="emailIngresso" class="dadosIngresso" placeholder="E-mail" required>
                    <i class="ph-envelope"></i>
                </div>
                <div class="secaoRegistro">
                    <input type="password" id="senhaIngresso" class="dadosIngresso" placeholder="Senha" required>
                    <i id="botaoSenha" class="ph-eye-closed"></i>
                </div>
                <button type="submit" id="botaoIngressar" class="iniciarSessao">Login</button>
                 <p class="texto">Ou faça login com o Google 
                    <img id="imgGoogle" src="imagens/GoogleOriginal.png">
                 </p>
                <p class="texto2">Não tem uma conta?<a id="registrar-se" href="#/registro"> Registre-se</a></p>
            </form>
             
        </div>
        <footer>By: Amanda Gusmão & Layssa Aragão</footer>`;
  return formIngresso;
};

// Função que se encarrega do inicio de Sessão por email
export const login = (selectorForm, containerError) => {
  mostrarEocultarSenha("botaoSenha", "senhaIngresso"); // função de mostrar e ocultar senha
  encerrarAtividadeUsuario(); // vê que não há atividade de usuário
  sessionStorage.clear(); // limpa o Storage
  const iniciarCon = document.getElementById(selectorForm);
  iniciarCon.addEventListener("submit", (e) => {
    e.preventDefault(); // faz com que o formulario nao atualize - refresh
    const emailIngresso = document.getElementById("emailIngresso").value;
    const senhaIngresso = document.getElementById("senhaIngresso").value;
    // aqui chama o container com os erros
    const localExibicao = document.getElementById(containerError);

    loginUsuario(emailIngresso, senhaIngresso)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified === true) {
          // obter dados do usuário logado para adicionar à sessionStorage
          obterPeloId(user.uid, "usuarios").then((data) => {
            const dataa = data;
            dataa.id = user.uid;
            sessionStorage.setItem("userSession", JSON.stringify(dataa));
            window.location.hash = "#/timeline";
          });
        } else {
          // mostra mensagem de erro se nao verifico por email
          localExibicao.innerHTML = modoInicioSecao.confirmar();
          setTimeout(() => {
            const exibicaoes = document.getElementById("exibicaoConfirmar");
            exibicaoes.style.display = "none";
          }, 5000);
        }
      })
      .catch((error) => {
        // todas as mensagens de erro são definidas
        if (
          error.message === "Firebase: Error (auth/invalid-email)." ||
          error.message === "Firebase: Error (auth/wrong-password)."
        ) {
          localExibicao.innerHTML = modoInicioSecao.dadosInvalidos();
          setTimeout(() => {
            const exibicaoes = document.getElementById("exibicaoDadosInvalidos");
            exibicaoes.style.display = "none";
          }, 5000);
        } else if (error.message === "Firebase: Error (auth/user-not-found).") {
          localExibicao.innerHTML = modoInicioSecao.usuarioInvalido();
          setTimeout(() => {
            const exibicaoes = document.getElementById("exibicaoUsuarioInvalido");
            exibicaoes.style.display = "none";
          }, 5000);
        } else {
          localExibicao.textContent = "Ocorreu um erro";
        }
      });
  });
  
 // inicio sessão com provedor google
 const botaoGoogle = document.getElementById("imgGoogle");
 botaoGoogle.addEventListener("click", () => {
   sessionStorage.clear();
   googleInicioSessao(provedor)
     .then((result) => {
       const googleUser = result.user;
       searchUser(result.user.uid).then((user) => {
         if (user.exists()) {
           const data = user.data();
           data.id = googleUser.uid;
           sessionStorage.setItem("userSession", JSON.stringify(data));
           window.location.hash = "#/timeline";
           return;
         }
         adicionarUsuarioGoogle(googleUser.uid, googleUser).then(() => {
           const data = {
             email: googleUser.email,
             username: googleUser.displayName,
             id: googleUser.uid,
             pronomes: "",
             local: " ",
             imgUsuario: googleUser.photoURL,
             imgCapa: "imagens/img-de-capa.png",
           };
           // adicionado dados ao sessionStorage
           sessionStorage.setItem("userSession", JSON.stringify(data));
           window.location.hash = "#/timeline";
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
