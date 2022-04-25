import { storage, ref, uploadBytes, getDownloadURL } from "./config.js";

// Faz o upload do arquivo para o storage e devolve o url da imagem
export const subirFileStorage = async (file, pasta) => {
  if (!file) {
    return null;
  }

  const arquivoRef = ref(storage, `${pasta}/${file.name}`);
  await uploadBytes(arquivoRef, file);
  const trazerArquivo = getDownloadURL(arquivoRef);
  return trazerArquivo;
};
