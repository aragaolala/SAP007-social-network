import {
    getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup 
  } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
  import { getFirestore, addDoc , collection } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';
  import { app } from './configurationfirebase.js';
  
  export const auth = getAuth();
  export const db = getFirestore();
  const provider = new GoogleAuthProvider();
  
  export const registerUser = () => {
    const email = document.getElementById('e-mail').value;
    const password = document.getElementById('password').value;
    const fullName = document.getElementById('name').value;
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((UserCredential) => {
        const user = UserCredential.user;
        updateProfile(user, {
          displayName: fullName,
        });
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Code: ${errorCode}`);
        console.log(`Message: ${errorMessage}`);
      });
  };
  
  const loginUser = () => {
    console.log('Logando usuária');
  };
  
  const loginOutUser = () => {
    console.log('Encerrando sessão usuária');
  };
  
  // função para obter sessão iniciada do usuário atual (não logado)
  export const getCurrentUser = () => {
    const uid = 'Anonimo';
    const user = auth.currentUser;
    if (user) {
      return user;
    }
    return { displayName: uid };
  };
  
  // dados dos usuários do google
  const googleUsers = async () => {
    const user = auth.currentUser;
    if (user !== null) {
      const docRef = await addDoc(collection(db, 'googleUsers'), {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        photo: user.photoURL,
      });
    }
  };
  // iniciar sessão registro com Google
  const startGoogle = () => {
    const provider = new GoogleAuthProvider();
  
    signInWithPopup(auth, provider)
      .then((result) => {
      // Isso dá um token de acesso do Google. Podemos usá-lo para acessar a API do Google
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        googleUsers();
        window.location.hash = '#/home';
      }).catch((error) => {
      // Erros tratados aqui.
        const errorCode = error.code;
        const errorMessage = error.message;
        // O e-mail da conta do usuário usada
        const email = error.email;
        // O tipo AuthCredential que foi usado
        const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      });
  };
  export const startGoogleToExport = startGoogle();
  console.log(startGoogleToExport);