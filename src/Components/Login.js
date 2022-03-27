// eslint-disable-next-line import/no-cycle
import { Register } from "./Register.js";
import { Home } from "./Home.js";
import { startGoogleToExport } from "../lib/librariesfirebase.js";

export const Login = () => {
  document.getElementById("root").innerHTML = `
    <div id="div-login">
        <div id="div-logo">
            <img src="images/logo.png" class="logo"/>
            <p class="subtitle">Speak your mind and find support</p>
        </div>
        <div class="login-email">
            <br>
            <i class="fa-solid fa-envelope icon-email"></i>
            <input type="email" class="e-mail" id="correo" placeholder="Email"></input><br><br>
        </div>
        <div class="write-password">
            <i class="fa-solid fa-lock icon-password"></i>
            <input type=password class="password" id="contraseña" placeholder="Senha"></input><br><br>
        </div>
        <button id="iniciar">Iniciar sessão</button> <br><br>
        <button id="google"><img src="images/google-logo.png" class="image-google"/><p>Continuar com o Google</p></button> <br><br>
        <p id="registro-google">Ou</p><br>
        <p id="registro">Registre-se no Grrl Talk</p><br><br>
    </div>
    <div class="div-img-login"><img src="images/wall2.jpeg" class="img-login"/>
    </div>`;

  // Função para registro
  const getRegister = document.querySelector("#registro");
  const starting = document.querySelector("#iniciar");
  getRegister.addEventListener("click", () => {
    window.location.hash = "#/register";
  });

  starting.addEventListener("click", () => {
    // Leva para a página home (futuro feed)
    window.location.hash = "#/home";
  });
  const loginGoogle = document.getElementById("google");
  loginGoogle.addEventListener("click", () => {
    console.log(startGoogleToExport);
  });
};