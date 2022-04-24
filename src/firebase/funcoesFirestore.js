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

// Obter todos os documentos da coleção 'post' usando onsnapshot
export const obterPosts = async (callback) => {
  const colRef = collection(db, 'posts');
  const q = query(colRef, orderBy('timestamp'));
  await onSnapshot(q, callback);
};

// Obter dados de todos os usuários
export const obterUsuarios = async () => {
  const colRef = collection(db, 'usuarios');
  const querySnapshot = await getDocs(colRef).then((snapshot) => {
    const posts = [];
    snapshot.docs.forEach((docs) => {
      posts.push({ ...docs.data(), userId: docs.id });
    });
    return posts;
  });
  return querySnapshot;
};

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

// Enviar dados para a coleção posts no firestore
export const subirDataHomeCol = (criadorPost, post, Categoria, urlImg) => {
  const colRefPost = collection(db, 'posts');
  const functionAdd = addDoc(colRefPost, {
    usuarioId: criadorPost,
    publicacao : post,
    categoria: Categoria,
    imgPost: urlImg,
    timestamp: serverTimestamp(),
    likes: [],
  });
  return functionAdd;
};

// Para atualizar o arranjo de likes
export const subirLikes = async (idPost, dataLikes) => {
  const docId = doc(db, 'posts', idPost);
  await updateDoc(docId, {
    likes: dataLikes,
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
