/* eslint-disable max-len */
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
} from './config.js';

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
export const obterPeloId = (idUser, nameColection) => {
  const docRef = doc(db, nameColection, idUser);
  const querySnapshot = getDoc(docRef).then((docs) => docs.data());
  return querySnapshot;
};

// Adicionar dados iniciais no momento do registro para a coleção de usuários
export const adicionarDataUserFS = async (id, Username, email, Pronomes, Local, srcImg, srcImgCapa) => {
  const colRefId = doc(db, 'usuarios', id);
  await setDoc(colRefId, {
    username: Username,
    email,
    local: Local,
    pronomes: Pronomes,
    imgUsuario: srcImg,
    imgCapa: srcImgCapa,
  });
};

// Enviar dados para a coleção posts no firestore - cria publicação e sobe
export const subirPosts = (criadorPost, post, Categoria, urlImg) => {
  const colRefPost = collection(db, 'posts');
  const functionAdd = addDoc(colRefPost, {
    usuarioId: criadorPost,
    publicacao: post,
    categoria: Categoria,
    imgPost: urlImg,
    timestamp: serverTimestamp(),
    likes: [],
    comments: [],
  });
  return functionAdd;
};

// Para atualizar a estrutura de likes
export const subirLikes = async (idPost, dataLikes) => {
  const docId = doc(db, 'posts', idPost);
  await updateDoc(docId, {
    likes: dataLikes,
  });
};

// Para atualizar a estrutura de comentários
/* eslint-disable*/
export const subirComments = async (idPost, dataComments) => {
  const docId = doc(db, 'posts', idPost);
  await updateDoc(docId, {
    comments: dataComments,
  });
};

// Para atualizar os dados do perfil na coleção de usuários
export const atualizarPerfil = (userId, username, pronomes, local, imgUsuario, imgCapa) => {
  const colRefId = doc(db, 'usuarios', userId);

  const dadosParaAtualizar = {
    username,
    pronomes,
    local,
  };

  if (imgUsuario) {
    dadosParaAtualizar.imgUsuario = imgUsuario;
  }

  if (imgCapa) {
    dadosParaAtualizar.imgCapa = imgCapa;
  }

  return updateDoc(colRefId, dadosParaAtualizar);
};

export const searchUser = async (userId) => {
  const colRef = doc(db, 'usuarios', userId);
  const user = getDoc(colRef);
  return user;
};

// Adicionar usuário ao firestore ao registrar com google
export const adicionarUsuarioGoogle = (id, user) => {
  const colRefId = doc(db, 'usuarios', id);
  return setDoc(colRefId, {
    username: user.displayName,
    email: user.email,
    pronomes: '',
    local: '',
    imgUsuario: user.photoURL,
    imgCapa: 'imagens/img-de-capa.png',
  });
};

// Buscar posts criados pelo usuario logado
export const obterUserPosts = async () => {
  const userId = JSON.parse(sessionStorage.userSession).id;
  const colRef = collection(db, 'posts');
  const q = query(colRef, orderBy('timestamp'));
  const querySnapshot = await getDocs(q);
  const posts = [];
  querySnapshot.forEach((docs) => {
    posts.push({ ...docs.data(), id: docs.id });
  });
  const postFiltrado = posts.filter((e) => e.usuarioId === userId);
  return postFiltrado;
};

// Remover um post conforme o postid
export const excluirPost = async (postId) => {
  await deleteDoc(doc(db, 'posts', postId));
};

// Editar um post em específico
export const atualizarPost = (postId, publicacao) => {
  const colRefId = doc(db, 'posts', postId);
  return updateDoc(colRefId, {
    publicacao,
  });
};

// Obter posts dos grupos por categoria
export const obterPostsGrupo = async (grupo) => {
  const colRef = collection(db, 'posts');
  const q = query(colRef, orderBy('timestamp'));
  const querySnapshot = await getDocs(q).then((snapshot) => {
    const posts = [];
    snapshot.docs.forEach((docs) => {
      posts.push({ ...docs.data(), postId: docs.id });
    });
    const postFiltrado = posts.filter((e) => e.categoria === grupo);
    return postFiltrado;
  });
  return querySnapshot;
};
