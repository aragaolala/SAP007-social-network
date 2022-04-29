const registroUsuario = jest.fn(() => Promise.resolve());
const googleInicioSessao = jest.fn(() => Promise.resolve());
// const sendPasswordResetEmail = jest.fn(() => Promise.resolve());
const signInWithPopup = jest.fn(() => Promise.resolve('fake-id-user'));

export {
  registroUsuario,
  googleInicioSessao,
  signInWithPopup,
};
