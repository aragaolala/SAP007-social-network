// importando funções que serão testadas
import {
  createUserWithEmailAndPassword /* auth, */,
} from '../src/firebase/config.js';
import { registroUsuario } from '../src/firebase/funcoesAuth.js';

jest.mock('../src/firebase/config.js');

// registroUsuario
describe('registroUsuario', () => {
  it('Deveria ser uma função de registro', () => {
    expect(typeof registroUsuario).toBe('function');
  });
  it('Deveria registrar um usuário com email e senha', () => registroUsuario('laa.brz@gmail.com', '123456').then(() => {
    expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe(
      'laa.brz@gmail.com',
    );
    expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('123456');
  }));
});
