import {
    loginUsuario,
    googleInicioSessao,
    encerrarAtividadeUsuario,
  } from "../firebase/funcoesAuth.js";
  import { provedor, GoogleAuthProvider } from "../firebase/config.js";


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
