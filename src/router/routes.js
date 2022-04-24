import { formRegistros, registroemail } from "../componentes/registro.js";
import { formInicioSessao, login } from "../componentes/login.js";



export const visualizacaoTelas = () => {
  const main = document.getElementById("main");
  main.innerHTML = "";
  // devolve o ponto de ancoragem do URL (caminho/rota )
  switch (window.location.hash.toLowerCase()) {
    case "":
    case "#/":
    case "#/inicio":
      main.appendChild(fundoHome(formInicioSessao()));
      login("formIngresso", "localExibicao");
      break;

    case "#/registro":
      main.appendChild(fundoHome(formRegistros()));
      registroemail("formRegistro", "localExibicao");
      break;
  }
};