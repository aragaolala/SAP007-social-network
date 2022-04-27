import { atualizarPerfil } from '../firebase/funcoesFirestore.js';
import { validarSessaoStorage } from './validacoes.js';
import { subirFileStorage } from '../firebase/funcoesStorage.js';

// Renderizar seção editar perfil
export const conteudoEditarPerfil = () => {
  const editarSecao = document.createElement('section');
  editarSecao.classList.add('corpoEditarPerfil');
  const userData = validarSessaoStorage();
  editarSecao.innerHTML = `
          <nav class= "barraNavegacaoInferior">
              <ul>
                  <li class="list">
                      <a href="#/timeline">
                          <span class="icon">
                              <img src="imagens/home2.png">
                          </span>
                      </a>
                  </li>
                  <li class="list">
                      <a class="abrirExibicao">
                          <span class="icon">
                              <img src="imagens/busca.png">
                          </span>
                      </a>
                  </li>
                  <li class="list">
                      <a href="#/meuperfil">
                          <span class="iconUser">
                              <img src="${userData.imgUsuario}">
                          </span>
                      </a>
                  </li>
              </ul>
          </nav>

          <div class= "fundoExibicao" id="fundoExibicao">
          <div class="exibicao-perfil-container" id="exibicaoPerfilCont">
              <p class="close" id="close"></p>
              <div class="exibicaoContent exibicaoClose" id="exibicao">
                  <div class="container-superior-perfil">
                      <div class="fundoImagemSecaoPerfil">
                          <img id="imgDeCapaUsuario"src="${userData.imgCapa}">
                      </div>
                      <div class="imgAtualDoUser" id="imgAtualDoUser">
                          <div class="imgPerfilUsuario">
                              <img id="imgUsuario" src="${userData.imgUsuario}">
                          </div>

                          <div class="conteudoTextoPerfil">
                              <h2 id="nomeDoUsuario">${userData.username}</h2>
                              <p id="descricaoDoPerfil">${userData.pronomes}</p>
                              <p id="localDoPerfil">${userData.local}</p>
                          </div>
                      </div>
                  </div>

                  <div class="exibicaoFormulario" id="exibicaoFormulario">
                  <form id="formIngresso">

                      <div class="caixaInputDadosImg">
                          <p class="txtDosCamposAtualizarPerfil">Foto de perfil</p>
                          <input type="file" id="selbtn" class="imgParaAtualizar"></input>
                      </div>

                      <div class="caixaInputDadosImg">
                          <p class="txtDosCamposAtualizarPerfil">Foto de capa</p>
                          <input type="file" id="ImgCapaUpdate" class="imgParaAtualizar"></input>
                      </div>

                      <div class="caixaInputDados">
                          <p class="txtDosCamposAtualizarPerfil">Usuária</p>
                          <input type="text" id="atualizacaoUsuario" class="dadosParaAtualizar" autocapitalize="sentence" value="${userData.username}">
                      </div>

                      <div class="caixaInputDados">
                          <p class="txtDosCamposAtualizarPerfil">Pronomes</p>
                          <input type="text" id="atualizacaoPronome" class="dadosParaAtualizar" autocapitalize="sentence" value="${userData.pronomes}">
                      </div>

                      <div class="caixaInputDados">
                          <p class="txtDosCamposAtualizarPerfil">Cidade</p>
                          <input type="text" id="atualizacaoLocal" class="dadosParaAtualizar" autocapitalize="sentence" value="${userData.local}">
                      </div>
                      <div class="botoesFormularios">
                          <button type="submit" id="salvarMudancas" class="salvarMudancas">Salvar</button>  
                          <button class="btnInicio"><a href="#/timeline">Início</a></button> 
                      </div>
                  </form>
              </div>
      
          </div>
      </div>
  </div>
`;
  return editarSecao;
};

// Funcionalidade para sustituir dados da sessão perfil
export const atualizarDadosPerfil = (
  username,
  local,
  pronomes,
  imgUsuario,
  imgCapa,
) => {
  const nomeDoUsuario = document.getElementById('nomeDoUsuario');
  const descricaoDoPerfil = document.getElementById('descricaoDoPerfil');
  const localDoPerfil = document.getElementById('localDoPerfil');
  const imgUsuarioElement = document.getElementById('imgUsuario');
  const imgCapaElement = document.getElementById('imgDeCapaUsuario');
  nomeDoUsuario.innerHTML = username;
  descricaoDoPerfil.innerHTML = pronomes;
  localDoPerfil.innerHTML = local;
  if (imgUsuario) {
    imgUsuarioElement.src = imgUsuario;
  }
  if (imgCapa) {
    imgCapaElement.src = imgCapa;
  }
};

// Funcionalidade do botão Editar Perfil
export const btnEditarPerfil = () => {
  const btnSalvarMudancas = document.getElementById('salvarMudancas');
  const btnarquivoLocal = document.getElementById('selbtn');
  const btnarquivoLocalCapa = document.getElementById('ImgCapaUpdate');
  const arquivoImgUsuario = [];
  const arquivoImgCapa = [];
  btnarquivoLocal.addEventListener('change', (e) => {
    arquivoImgUsuario.push(e.target.files[0]);
  });
  btnarquivoLocalCapa.addEventListener('change', (e) => {
    arquivoImgCapa.push(e.target.files[0]);
  });
  btnSalvarMudancas.addEventListener('click', async (e) => {
    e.preventDefault();
    const inputUsuarioAtualizado = document.getElementById('atualizacaoUsuario').value;
    const inputPronomesAtualizado = document.getElementById('atualizacaoPronome').value;
    const inputLocalAtualizado = document.getElementById('atualizacaoLocal').value;
    const userData = JSON.parse(sessionStorage.userSession);
    const urlImagem = await subirFileStorage(
      arquivoImgUsuario[arquivoImgUsuario.length - 1],
      'imgUsuarios',
    );
    const urlCapa = await subirFileStorage(
      arquivoImgCapa[arquivoImgCapa.length - 1],
      'imgCapa',
    );
    atualizarPerfil(
      userData.id,
      inputUsuarioAtualizado,
      inputPronomesAtualizado,
      inputLocalAtualizado,
      urlImagem,
      urlCapa,
    ).then(() => {
      // recebendo os dados para atualizar no sessionStorage e metodo atualizarDadosPerfil
      userData.username = inputUsuarioAtualizado;
      userData.local = inputLocalAtualizado;
      userData.pronomes = inputPronomesAtualizado;
      userData.imgUsuario = urlImagem || userData.imgUsuario;
      userData.imgCapa = urlCapa || userData.imgCapa;
      sessionStorage.setItem('userSession', JSON.stringify(userData));
      atualizarDadosPerfil(
        inputUsuarioAtualizado,
        inputLocalAtualizado,
        inputPronomesAtualizado,
        urlImagem,
        urlCapa,
      );
    });
  });
};
