import { estadoAuthUsuario } from '../firebase/funcoesAuth.js';

// função que permite ao usuário entrar somente se estiver logado
export const userState = () => {
  estadoAuthUsuario((user) => {
    if (user === null || user === undefined) {
      window.location.hash = '#/inicio';
    }
  });
};

// Função para chamar o sessionStorage
export const validarSessaoStorage = () => {
  let userData = sessionStorage.getItem('userSession');
  // console.log(userData);
  if (!userData) {
    userData = {
      username: '',
      email: '',
      pronomes: '',
      local: '',
    };
  } else {
    userData = JSON.parse(sessionStorage.userSession);
  }
  return userData;
};
