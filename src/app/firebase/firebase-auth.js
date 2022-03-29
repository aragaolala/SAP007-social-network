import {
  auth,
  app,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from './firebase-initializer.js';

import {
  validateField,
  validatePassword,
  validateEmail,
} from '../helpers/forms-validation.js';

import { addUser } from './firebase-data.js';

export { sendPasswordResetEmail, auth };

const provider = new GoogleAuthProvider(app);

/** ***************** Iniciar a sessão com email ************************** */
export const enviarAcesso = (email, password) => signInWithEmailAndPassword(auth, email, password);

/** **********************Continuar com o Google********************************* */
export const loginGoogle = () => signInWithPopup(auth, provider)
// ! Devemos verificar primeiro se esta conta já está registrada no firebase,
  // ! se você estiver no firestore, pedir-lhe para digitar seus dados
  .then((response) => {
    const user = response.user;
    addUser(user, '', '');
    window.location.hash = '#/timeline';
  });

/** ************************* Encerrar sessão ************************** */
export const logOutGoogle = () => { signOut(auth); };

/** **************** Registro com email ************************* */
export function enviarRegistro() {
  document.getElementById('errorLogin').textContent = '';
  // Primera vista de registro
  const name = document.getElementById('rname');
  const email = document.getElementById('remail');
  const password = document.getElementById('rpassword');

  name.classList.remove('error');
  email.classList.remove('error');
  password.classList.remove('error');

  const nameV = name.value.trim();
  const emailV = email.value.trim();
  const passwordV = password.value.trim();
  // Validando os campos

  // ------------------------------------

  if (!validateEmail(emailV) || !validatePassword(passwordV)) {
    document.getElementById('errorLogin').textContent = 'Datos inválidos';
  }

  if (
    !validateField(nameV)
    || !validateField(emailV)
    || !validateField(passwordV)
  ) {
    document.getElementById('errorLogin').textContent = 'Datos inválidos';
    // Aparece o input
    name.classList.remove('success');
    email.classList.remove('success');
    password.classList.remove('success');

    name.classList.add('error');
    email.classList.add('error');
    password.classList.add('error');
  } else {
    name.classList.remove('error');
    email.classList.remove('error');
    password.classList.remove('error');

    name.classList.add('success');
    email.classList.add('success');
    password.classList.add('success');

    // Validando os campos da próxima vista, se vazios
    createUserWithEmailAndPassword(auth, emailV, passwordV)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Adicionamos este usuário em nosso banco de dados
        return addUser(user, nameV, passwordV);
      })
      .then(() => updateProfile(auth.currentUser, {
        displayName: nameV,
        photoURL:
            'gs://girl-talk-app.appspot.com',
      })
        .then(() => {
          // Profile updated!
          window.location.hash = '#/timeline';
        }))
      .catch((error) => {
        const errorCode = error.code;

        switch (errorCode) {
          case 'auth/email-already-in-use':
            document.getElementById('errorLogin').textContent = 'El correo ingresado ya está en uso';
            break;
          default:
        }
      });
  }
}

export function changeNameAndPhotoAuth(objNewData) {
  updateProfile(auth.currentUser, {
    displayName: objNewData.user_name,
    photoURL: objNewData.user_photo,
  });
}

// Sempre me pedirão credenciais para apagar conta, alterar senha ou e-mail
export const createCredential = (user, password) => {
  const email = user.email;
  const credential = EmailAuthProvider.credential(email, password);
  return credential;
};

// O método indicará a função (se é para atualizar o correio ou a senha)
export const reauth = async (user, credential) => reauthenticateWithCredential(user, credential);

export const changePasswordAuth = (user, newPassword) => updatePassword(user, newPassword);

export const changeEmailAuth = (user, newEmail) => updateEmail(user, newEmail);
