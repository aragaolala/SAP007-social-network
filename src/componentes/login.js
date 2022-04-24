// Criação do formulário de login
export const formInicioSessao = () => {
  const formIngresso = `
        <div id="inicio" class="boxInterno2">
            <form id="formIngresso">
                <p class="texto">Olá, de novo!</p>
                <div class="secaoRegistro">
                    <input type="text" id="emailIngresso" class="dadosIngresso" placeholder="E-mail" required>
                    <i class="ph-envelope"></i>
                </div>
                <div class="secaoRegistro">
                    <input type="password" id="senhaIngresso" class="dadosIngresso" placeholder="Senha" required>
                    <i id="botaoSenha" class="ph-eye-closed"></i>
                </div>
                <button type="submit" id="botaoIngressar" class="iniciarSessao">Login</button>
                 <p class="texto">Ou faça login com o Google 
                    <img id="imgGoogle" src="imagens/GoogleOriginal.png">
                 </p>
                <p class="texto2">Não tem uma conta?<a id="registrar-se" href="#/registro"> Registre-se</a></p>
            </form>
             
        </div>
        <footer>By: Amanda Gusmão & Layssa Aragão</footer>`;
  return formIngresso;
};
