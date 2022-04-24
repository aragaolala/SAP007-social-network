import { Register } from '../componentes/registro.js';
import { Login } from '../componentes/login.js';
import { Home } from '../componentes/home-mobile.js';

export const routes = (hash) => {
  const containerRoot = document.getElementById('root');
  containerRoot.innerHTML = ''; 
  switch (hash) {
    case '#/login':
      Login();
      break;

    case '#/register':
      Register();
      break;

    case '#/home':
      Home();
      break;

    // Caso o URL não esteja correto, ele nos redirecionará para a página "Não disponível".
    default:
      containerRoot.innerHTML = 'Página nao disponível';
  }
};