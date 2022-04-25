import { atualizarPerfil } from '../firebase/funcoesFirestore.js';
import { validarSessaoStorage } from './validacoes.js';
import { subirFileStorage } from '../firebase/funcoesStorage.js';

// Renderizar sessão editar perfil
export const conteudoEditarPerfil = () => {
    const editarSecao = document.createElement('section');
    editarSecao.classList.add('corpoEditarPerfil');
    const userData = validarSessaoStorage();
    editarSecao.innerHTML = `
          <nav class= "barraNavegacaoInferior">
              <ul>
                  <li class="list">
                      <a class="abrirExibicao">
                          <span class="icon">
                              <img src="imagens/users-three.png">
                          </span>
                      </a>
                  </li>
                  <li class="list">
                      <a href="#/timeline">
                          <span class="icon">
                              <img src="imagens/house-fill.png">
                          </span>
                      </a>
                  </li>
                  <li class="list">
                      <a href="#/meuperfil">
                          <span class="icon">
                              <img src="${userData.imgUsuario}">
                          </span>
                      </a>
                  </li>
              </ul>
          </nav>