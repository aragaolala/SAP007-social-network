// importando funções que serão testadas
// eslint-disable-next-line import/no-unresolved

/*
* @jest-environment jsdom
*/
/* eslint-disable */
import { registroUsuario, loginUsuario } from '../src/firebase/funcoesAuth.js';
import registroEmail from '../src/componentes/registro.js';
import login from '../src/componentes/login.js';

jest.mock('../src/firebase/funcoesAuth.js');
jest.mock('../src/firebase/config.js');

describe('registroUsuario', () => {
  it('Deve fazer o registro da usuária', () => {
    registroUsuario.mockResolvedValueOnce();
        const name = 'Jesus Opera Milagres';
        const email = 'porfavor@funciona.com';
        const password = '123456';
        const registro = registroEmail();
        const nomeInput = registro.getElementById('usuarioRegistro').value;
        const emailInput = registro.getElementById('emailRegistro').value;
        const senhaInput = registro.getElementById('senhaRegistro').value;
        const btnRegistrar = registro.getElementById('btnRegistro').value;

        nomeInput.value = name;
        emailInput.value = email;
        senhaInput.value = password;
        
        btnRegistrar.dispatchEvent(new Event('click'));

    expect(registroUsuario).toHaveBeenCalledWith(name, email, password);
    expect(registroUsuario).toHaveBeenCalledTimes(1);
  });
});

describe('loginUsuario', () => {
  it('Deve fazer login da usuária', () => {
    loginUsuario.mockResolvedValueOnce();
        const email = 'porfavor@funciona.com';
        const password = '123456';
        const registro = login();
        const emaillogin = registro.getElementById('emailLogin').value;
        const senhaLogin = registro.getElementById('senhaLogin').value;
        const btnlogin = registro.getElementById('botaoDeLogin').value;

        emaillogin.value = email;
        senhaLogin.value = password;
        
        btnlogin.dispatchEvent(new Event('click'));

    expect(loginUsuario).toHaveBeenCalledWith(email, password);
    expect(loginUsuario).toHaveBeenCalledTimes(1);
  });
});






/*import { registroUsuario } from './src/firebase/funcoesAuth.js';
// eslint-disable-next-line import/no-unresolved
import { createUserWithEmailAndPassword } from './src/firebase/config.js';
// eslint-disable-next-line import/no-unresolved
jest.mock('./config.js');

it('registroUsuario should create a user with email; password and displayname', async () => {
  createUserWithEmailAndPassword.mockResolvedValue({
    user: {},
  });

  await registroUsuario('', '123456');

  expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
});

import {
  createUserWithEmailAndPassword /* auth, ,
} from '../src/firebase/config.js';
import { registroUsuario } from '../src/firebase/funcoesAuth.js';

jest.mock('../src/firebase/config.js');

// registroUsuario
describe('registroUsuario', () => {
  it('Deveria ser uma função de registro', () => {
    expect(typeof registroUsuario).toBe('function');
  });
  it('Deveria registrar um usuário com email e senha', () =>
  registroUsuario('teste@gmail.com', '123456').then(() => {
    expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe(
      'teste@gmail.com',
    );
    expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('123456');
  }));
}); */
