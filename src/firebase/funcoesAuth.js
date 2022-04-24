/* eslint-disable max-len */
import {
  auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "./config.js";

// Cria um usuário com e- mail e senha
export const registroUsuario = (email, senha) =>
  createUserWithEmailAndPassword(auth, email, senha);
// as funcoes que vem por default do firebase, recebem o "auth" como primeiro parametro, que é o google authenticator
// como nao usaremos esse auth, reescrevemos a funcao passando só email e senha
// dentro do firebase, na funcao createUserWithEmailAndPassword deve ter algo para ignorar o auth quando ele nao é recebido

// Login de usuário com e-mail e senha
export const loginUsuario = (email, senha) =>
  signInWithEmailAndPassword(auth, email, senha);

// Login do usuário com conta do Google
export const googleInicioSessao = (provedor) => signInWithPopup(auth, provedor);

// Fechar Sessão do Usuário

export const envioEmailVerificacao = () =>
  sendEmailVerification(auth.currentUser);

export const estadoAuthUsuario = (callback) =>
  onAuthStateChanged(auth, callback);
