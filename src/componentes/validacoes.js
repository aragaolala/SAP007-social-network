import { estadoAuthUsuario } from '../firebase/funcoesAuth.js';

// função que permite ao usuário entrar somente se estiver logado
export const userState = () => {
  estadoAuthUsuario((user) => {
    if (user === null || user === undefined) {
      window.location.hash = '#/inicio';
    }
  });
};