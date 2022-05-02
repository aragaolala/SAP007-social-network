// importando funcões que serão testadas
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signInWithPopup,
  sendPasswordResetEmail,
  updatePassword,
} from '../src/firebase/config';
import {
  loginUsuario,
  registroUsuario,
  envioEmailVerificacao,
  estadoAuthUsuario,
  googleInicioSessao,
  resetPasswordFirebase,
  atualPasswordFirebase,

} from '../src/firebase/funcoesAuth';

jest.mock('../src/firebase/config');
// temos uma pasta __mocks__ no firebase
// Essa função recebe como parâmetro o caminho do módulo que será sobrescrito com o mock
// do artigo "fundamentando mocks em js do Gabriel Ramos"

// registroUsuario
describe('registroUsuario', () => {
  it('Deveria ser uma função de registro', () => {
    expect(typeof registroUsuario).toBe('function');
  });
  it('Deveria registrar a usuária', () => registroUsuario('meajuda@deus', '123456').then(() => {
    expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe(
      'meajuda@deus',
    );
    expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('123456');
  }));
});

// envioEmailVerificacao
describe('envioEmailVerificacao', () => {
  it('Deveria ser uma função que envia o email de verificação', () => {
    expect(typeof envioEmailVerificacao).toBe('function');
  });
  it('', () => envioEmailVerificacao().then(() => {
    expect(sendEmailVerification.mock.calls).toHaveLength(1);
  }));
});

// loginUsuario
describe('loginUsuario', () => {
  it('Deveria ser uma função de login', () => {
    expect(typeof loginUsuario).toBe('function');
  });
  it('Deveria iniciar a sessão da usuária', () => loginUsuario('meajuda@deus', '123456').then(() => {
    expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe('meajuda@deus');
    expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe('123456');
  }));
});

// googleInicioSessao com o popUp
describe('googleInicioSessao', () => {
  it('Deveria ser uma função login com o Google', () => {
    expect(typeof googleInicioSessao).toBe('function');
  });
  const provider = { id: 123, email: 'meajuda@jesus' };
  it('provedor', () => googleInicioSessao(provider).then(() => {
    expect(signInWithPopup.mock.calls[0][1]).toBe(provider);
  }));
});

// estadoAuthUsuario - o estado de login e que, a parir daí, é possível coletar dados sobre a user
describe('estadoAuthUsuario', () => {
  it('Deveria ser uma função do estado da usuária', () => {
    expect(typeof estadoAuthUsuario).toBe('function');
  });
  const callback = () => {};
  it('Deveria verificar o estado da usuária', () => estadoAuthUsuario(callback).then(() => {
    expect(onAuthStateChanged.mock.calls[0][1]).toEqual(callback);
  }));
});

// resetPasswordFirebase - reset de senha
describe('envioResetEmail', () => {
  it('Deveria ser uma função que envia o email de redefinição de senha', () => {
    expect(typeof resetPasswordFirebase).toBe('function');
  });
  it('', () => resetPasswordFirebase().then(() => {
    expect(sendPasswordResetEmail.mock.calls).toHaveLength(1);
  }));
});

// atualPasswordFirebase - senha atualizada
describe('senhaAtualizada', () => {
  it('Deveria ser uma função que atualiza a senha redefinida', () => {
    expect(typeof atualPasswordFirebase).toBe('function');
  });
  it('', () => atualPasswordFirebase().then(() => {
    expect(updatePassword.mock.calls).toHaveLength(1);
  }));
});
