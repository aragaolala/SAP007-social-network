// Este es el punto de entrada de tu aplicacion

import { myFunction } from "./lib/index.js";
import { routes } from "./lib/routes.js";

myFunction();
const init = () => {
  window.location.hash = "#/login";
  routes(window.location.hash);
  // observador();
};
init();

// Ao terminar de carregar a pág (event load), executa-se a func init

// O evento hashchange é executado quando o identificador da URL é mudado
window.addEventListener("hashchange", () => {
  routes(window.location.hash);
});

// import { Home } from './componentes/home-mobile.js';
// import { Login } from './componentes/login.js';
// import { Register } from './componentes/registro.js';

// const rootDiv = document.getElementById('root');

// const routes = {
//   '/': Home,
//   '/register': Register,
//   '/login': Login,
// };

