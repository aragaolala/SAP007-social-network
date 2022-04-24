import {
   obterPeloId, obterUsuarios,
  } from '../firebase/funcoesFirestore.js';
  import { subirFileStorage } from '../firebase/funcoesStorage.js';


const painelCompartilhar = document.createElement('form');
  painelCompartilhar.setAttribute('id', 'formCompartilhar');
  painelCompartilhar.classList.add('painelCompartilhar');
  painelCompartilhar.innerHTML = `
    <textarea id="inputCompartilhar" placeholder="O que gostaria de compartilhar?" rows="8" cols="76"></textarea>  
    
    <div class="botoes">
        <input type="file" placeholder="Adicionar imagem" id="compartilharImg">         
        <select name="Grupo" id="Grupo" class="Grupo">
          <option value="" selected disabled>Tema</option>
          <option value="Relacionamentos">Relacionamento</option>
          <option value="Web">Web</option>
          <option value="Saúde">Saúde</option>
          <option value="Viagens">Viagens</option>
          <option value="Amizade">Amizade</option>
          <option value="Moda">Moda/Beleza</option>
          <option value="Estudos">Estudos</option>
          <option value="Maternidade">Maternidade</option>
          <option value="Outros">Outros</option>
        </select>
        <button class="botaoCompartilhar">Publicar</button>
          
    </div>
  `;