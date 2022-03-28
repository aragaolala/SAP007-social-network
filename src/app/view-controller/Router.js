// eslint-disable-next-line import/named
import { onAuthStateChanged } from '../firebase/firebase-initializer.js';
import { auth } from '../firebase/firebase-auth.js';
import { components } from './index.js';
import { Loader } from './Loader.js';

// é executado uma única vez
export const Router = () => {
  // console.log("entrou na função router");

  const $root = document.getElementById('root');
  $root.textContent = '';

  const loader = Loader();
  $root.appendChild(loader);

  // eslint-disable-next-line consistent-return
  function render() {
    const route = window.location.hash;
    $root.textContent = '';

    switch (route) {
      case '#': {
        if (auth.currentUser) window.location.hash = '#/timeline';
        return $root.appendChild(components.login());
      }
      case '#/': {
        if (auth.currentUser) window.location.hash = '#/timeline';
        return $root.appendChild(components.login());
      }
      case '#/register': {
        if (auth.currentUser) window.location.hash = '#/register';
        return $root.appendChild(components.registro());
      }
      case '#/editPost': {
        if (auth.currentUser) {
          $root.classList.remove('main-container');
          return $root.appendChild(components.editPost());
        }
        window.location.hash = '#/';
        break;
      }
      case '#/muro': {
        if (auth.currentUser) {
          $root.classList.remove('main-container');
          return $root.appendChild(components.muro());
        }
        window.location.hash = '#/';
        break;
      }
      case '#/profile': {
        if (auth.currentUser) {
          $root.classList.remove('main-container');
          return $root.appendChild(components.profile());
        }
        window.location.hash = '#/';
        break;
      }
      case '#/passwordChange': {
        if (auth.currentUser.providerData[0].providerId === 'google.com') {
          // console.log(
          //   'Aqui faremos um append de um componente 404 ou algo'
          // );
        }
        if (auth.currentUser) {
          $root.classList.remove('main-container');
          return $root.appendChild(components.changePassword());
        }
        window.location.hash = '#/';
        break;
      }
      default:
        // Devemos criar uma vista caso o usuário coloque uma URL não existente
        return $root.appendChild(components.login());
      // return (window.location.hash = "#/");

      // break;
    }
  }

  // para assegurar que a execução seja única
  let hasRouterStarted = false;

  // é executado uma única vez
  function start() {
    render();
    window.addEventListener('hashchange', () => {
      render();
    });
    // já executou
    hasRouterStarted = true;
  }

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.hash = '#/';
    // console.log('o usuário já está sign out!');
    }
    // O router já foi executado?
    if (!hasRouterStarted) start();
  });
};
