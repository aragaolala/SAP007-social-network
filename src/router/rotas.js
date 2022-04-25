import { sobreNos}  from "../componentes/pag-sobre.js"
import { fundoHome } from "../componentes/logo-slogan.js";
import { formRegistros, registroEmail } from "../componentes/registro.js";
import { formInicioSessao, login } from "../componentes/login.js";
import {
  painel,
  painelPerfil,
  painelEditarPerfil,
  secaoCategorias,
} from "../componentes/timeline.js";
import {
  encerrarSessao,
  menuHamburguerHeader,
  exibicaoCategorias,
} from "../componentes/headerFeed.js";
import { userState } from "../componentes/validacoes.js";
import { criacaoPost } from "../componentes/home-mobile.js";
import { btnEditarPerfil } from "../componentes/editar-perfil.js";

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
      menuHamburguerHeader();
      criacaoPost("formCompartilhar", "container-post");
      exibicaoCategorias();
      break;

    case "#/relacionamentos":
      userState();
      main.appendChild(
        secaoCategorias("imagens/coracoes.png", "Relacionamentos")
      );
      encerrarSessao();
      menuHamburguerHeader();
      exibicaoCategorias();
      break;
    
    case "#/web":
      userState();
      main.appendChild(secaoCategorias("imagens/codigo.png", "Web"));
      encerrarSessao();
      menuHamburguerHeader();
      exibicaoCategorias();
      break;

    case "#/saude":
      userState();
      main.appendChild(secaoCategorias("imagens/saude.png", "Saúde"));
      encerrarSessao();
      menuHamburguerHeader();
      exibicaoCategorias();
      break;

      case "#/viagens":
        userState();
        main.appendChild(secaoCategorias("imagens/aviao.png", "Viagens"));
        encerrarSessao();
        menuHamburguerHeader();
        exibicaoCategorias();
        break;
  
      case "#/amizades":
        userState();
        main.appendChild(secaoCategorias("imagens/pulseira.png", "Amizade"));
        encerrarSessao();
        menuHamburguerHeader();
        exibicaoCategorias();
        break;

    case "#/moda":
      userState();
      main.appendChild(secaoCategorias("imagens/cabide.png", "Moda"));
      encerrarSessao();
      menuHamburguerHeader();
      exibicaoCategorias();
      break;

    /* Só posta se inserir a string "estudos" dentro da categoria no firestore. 
    Descobrir pq nao esta automático como os outros */
    /* RESOLVIDO: precisava mudar o valor no home-mobile.js */
    case "#/estudos":
      userState();
      main.appendChild(secaoCategorias("imagens/open-book.png", "Estudos"));
      encerrarSessao();
      menuHamburguerHeader();
      exibicaoCategorias();
      break;

    case "#/maternidade":
      userState();
      main.appendChild(secaoCategorias("imagens/bebe.png", "Maternidade"));
      encerrarSessao();
      menuHamburguerHeader();
      exibicaoCategorias();
      break;

    case "#/outros":
      userState();
      main.appendChild(secaoCategorias("imagens/more.png", "Outros"));
      encerrarSessao();
      menuHamburguerHeader();
      exibicaoCategorias();
      break;

    case "#/meuperfil":
      userState();
      main.appendChild(painelPerfil());
      encerrarSessao();
      menuHamburguerHeader();
      exibicaoCategorias();
      /* menuPontosHorizontais(); */
      break;

    case "#/editarperfil":
      userState();
      main.appendChild(painelEditarPerfil());
      encerrarSessao();
      menuHamburguerHeader();
      exibicaoCategorias();
      btnEditarPerfil();
      break;

      case "#/sobre":
        userState();
        main.appendChild(sobreNos());
        encerrarSessao();
        exibicaoCategorias();
        menuHamburguerHeader();
        break;

    default:
      main.innerHTML = "Página Não Encontrada";
      break;
  }
};
