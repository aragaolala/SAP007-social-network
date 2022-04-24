import {
  db,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  onSnapshot,
} from "./config.js";

// Obter os dados de cada usuario salvo no Firestore, procurar por id
export const obterPeloId = (idUser, nameColeccion) => {
  const docRef = doc(db, nameColeccion, idUser);
  const querySnapshot = getDoc(docRef).then((docs) => docs.data());
  return querySnapshot;
};

// Adicionar dados iniciais para o momento de registro para a coleção de usuários
export const adicionarDataUserFS = async (
  id,
  Username,
  email,
  Pronomes,
  Local,
  srcImg,
  srcImgCapa
) => {
  const colRefId = doc(db, "usuarios", id);
  await setDoc(colRefId, {
    username: Username,
    email: email,
    local: Local,
    pronomes: Pronomes,
    imgUsuario: srcImg,
    imgCapa: srcImgCapa,
  });
};

// Adicionar usuário ao firestore ao registrar com google
export const adicionarUsuarioGoogle = (id, user) => {
  const colRefId = doc(db, "usuarios", id);
  return setDoc(colRefId, {
    username: user.displayName,
    email: user.email,
    pronomes: "",
    local: "",
    imgUsuario: user.photoURL,
    imgCapa: "imagens/img-de-capa.png",
  });
};
