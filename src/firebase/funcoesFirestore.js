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

  // Adicionar dados iniciais para o momento de registro para a coleção de usuários
export const adicionarDataUserFS = async (id, Username, email, Pronomes, Local, srcImg, srcImgCapa) => {
    const colRefId = doc(db, 'usuarios', id);
    await setDoc(colRefId, {
      username: Username,
      email: email,
      local: Local,
      pronomes: Pronomes,
      imgUsuario: srcImg,
      imgCapa: srcImgCapa,
    });
  };