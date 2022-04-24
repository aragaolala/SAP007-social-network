// Criação de formulário de registro
export const formRegistros = () => {
  const formRegistro = `
    <div id='registro' class='boxInterno2'>
      <form id="formRegistro">
        <p class="texto">Criar Conta</p>
        <div class="secaoRegistro">
          <input type="text" id="usuarioRegistro" class="dadosIngresso" placeholder="Nome de usuária" required>
          <i class="ph-user"></i>
        </div>
        <div class="secaoRegistro">
          <input type="text" id="emailRegistro" class="dadosIngresso" placeholder="E-mail" required>
          <i class="ph-envelope"></i>
        </div>
        <div class="secaoRegistro">
          <input type="password" id="senhaRegistro" class="dadosIngresso" placeholder="Senha" required>
          <i id="botaoSenha" class="ph-eye-closed"></i>
        </div>
        <div class="secaoCheckbox">
          <input type="checkbox" id="checkRegistro" class="checkRegistro" required/><label class="texto">Aceito os termos 
          e condições das Políticas de Privacidade.</label>
        </div>
        <button type="submit" class="iniciarSessao">Registrar-se</button> 
        <p class="texto2">Já tem tem uma conta? <a id="registrar-se" href="#/inicio">Iniciar sessão</a></p>
      </form>
      
    </div>
    <footer>By: Amanda Gusmão & Layssa Aragão</footer>`;
  return formRegistro;
};