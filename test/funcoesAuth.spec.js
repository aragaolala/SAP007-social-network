// importando funcões que serão testadas
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification,
} from '../src/firebase/config';
import {
  loginUsuario, registroUsuario, envioEmailVerificacao,
} from '../src/firebase/funcoesAuth';

jest.mock('../src/firebase/config');
// temos uma pasta __mocks__ no firebase

// registroUsuario
describe('registroUsuario', () => {
  it('Deveria ser uma função de registro', () => {
    expect(typeof registroUsuario).toBe('function');
  });
  it('Deveria registrar a usuária', () => registroUsuario('meajuda@deus', '123456')
    .then(() => {
      expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe('meajuda@deus');
      expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('123456');
    }));
});

// loginUsuario
describe('loginUsuario', () => {
  it('Deveria ser uma função de legin', () => {
    expect(typeof loginUsuario).toBe('function');
  });
  it('Deveria iniciar a sessão da usuária', () => loginUsuario('meajuda@deus', '123456')
    .then(() => {
      expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe('meajuda@deus');
      expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe('123456');
    }));
});

// envioEmailVerificacao
describe('envioEmailVerificacao', () => {
  it('Deveria ser uma função que envia o email de verificação', () => {
    expect(typeof envioEmailVerificacao).toBe('function');
  });
  it('', () => envioEmailVerificacao()
    .then(() => {
      expect(sendEmailVerification.mock.calls).toHaveLength(1);
    }));
});
