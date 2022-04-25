import { formRegistros, registroEmail } from "../componentes/registro.js";
import { formInicioSessao, login } from "../componentes/login.js";
import { fundoHome } from "../componentes/logo-slogan.js";



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
      registroEmail("formRegistro", "localExibicao");
      break;

    case "#/timeline":
      userState();
      main.appendChild(painel());
      encerrarSessao();
      menuPontosVerticais();
      criacaoPost("formCompartilhar", "container-post");
      exibicaoCategorias();
      break;

      case "#/relacionamentos":
        userState();
        main.appendChild(
          secaoCategorias("imagens/coracoes.png", "Relacionamentos")
        );
        encerrarSessao();
        menuPontosVerticais();
        exibicaoCategorias();
        break;