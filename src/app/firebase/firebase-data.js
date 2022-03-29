// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  db,
  collection,
  doc,
  addDoc,
  setDoc,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  deleteDoc,
  orderBy,
  auth,
} from './firebase-initializer.js';

/** ****************Funções dos usuários******************** */
// Acrescenta um user ao FireStore
export function addUser(user, name, password) {
  let nameN;
  let emailN;
  let photoUrlN;
  let logedByN;
  let passwordN;
  const birthN = '';

  if (user.providerData[0].providerId === 'google.com') {
    // Se está logando com o Google
    nameN = user.displayName;
    emailN = user.email;
    photoUrlN = user.photoURL;
    logedByN = 'google';
    passwordN = null;
  } else {
    // Se está logando com password
    nameN = name;
    emailN = user.email;
    photoUrlN = 'https://firebasestorage.googleapis.com/v0/b/yami-cbaa4.appspot.com/o/user.png?alt=media&token=bfe80508-5817-4d84-83e1-6a074a16f198';
    logedByN = 'password';
    passwordN = password;
  }
  // console.log("entramos em AddUsers");
  const userdoc = doc(db, 'users', user.uid);
  // Criamos um documento com o ID do nosso usuário
  // setdoc usamos para especificar um id único que vamos colocar nele
  // O addDoc autogera o id
  return setDoc(userdoc, {
    user_id: user.uid,
    user_name: nameN,
    user_photo: photoUrlN,
    user_createdAt: user.metadata.createdAt,
    user_email: emailN,
    user_password: passwordN,
    user_logedBy: logedByN,
    user_birth: birthN,
  });
}

// Get User Data
export async function getUserData(userId) {
  const userRef = doc(db, 'users', userId);
  const docSnap = await getDoc(userRef);

  const usuario = docSnap.data();
  if (docSnap.exists()) {
    return usuario;
  }
  return {};
}
// todo: DESCOBRIR SE EXISTE ALGUM MÉTODO EXCLUSIVO PARA SABER SE O USUÁRIO EXISTE
// todo: EM FIRESTORE OU EM AUTH
export async function isExistingUser(email) {
  const q = query(collection(db, 'users'), where('user_email', '==', email));
  const docSnap = await getDocs(q);
  const userEmailMatch = [];

  docSnap.forEach((d) => {
    userEmailMatch.push(d.data());
  });

  let userExist;
  let emailUserSearched;
  // let pwdUserSearched;

  if (userEmailMatch.length === 0) {
    userExist = false;
    emailUserSearched = null;
    // pwdUserSearched = null;
  } else {
    userExist = true;
    emailUserSearched = userEmailMatch[0].user_email;
    // pwdUserSearched = userEmailMatch[0].user_password;
  }

  return {
    emailUserSearched,
    // pwdUserSearched,
    userExist,
  };
}

// Atualiza o usuario
export async function changePasswordFirestore(userId, password) {
  const userDocRef = await doc(db, 'users', userId);

  return updateDoc(userDocRef, {
    user_password: password,
  });
}

export function changeBasicDataFirestore(userId, objNewData) {
  const userDocRef = doc(db, 'users', userId);

  updateDoc(userDocRef, {
    user_photo: objNewData.user_photo,
    user_name: objNewData.user_name,
    user_birth: objNewData.user_birth,
    user_email: objNewData.user_email,
  });
}

