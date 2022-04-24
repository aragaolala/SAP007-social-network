//  Objeto que cria de forma dinâmica os modos para Registro

export const funcRegistro = {
  emailInvalido: () => {
    const invalidoEmailMsg = `
        <div class= "exibicaoError" id="exibicaoemailInvalido">
          <i class="fas fa-exclamation-triangle"></i>
          <p>E-mail inválido</p>
        </div>
      `;
    return invalidoEmailMsg;
  },

  emailExistente: () => {
    const msgEmailJaExistente = `
        <div class= "exibicaoError" id="exibicaoEmailExistente">
          <i class="fas fa-check-circle"></i>
          <p>Esse e-mail já existe</p>
        </div>
      `;
    return msgEmailJaExistente;
  },

  senhaInvalida: () => {
    const msgSenhaFraca = `
        <div class= "exibicaoError" id="exibicaoSenhaInvalida">
          <i class="fas fa-check-circle"></i>
          <p>A senha deve conter pelo menos 6 caracteres</p>
        </div>
      `;
    return msgSenhaFraca;
  },

  registroSucesso: () => {
    const registroSucessoMensagem = `
          <div class= "exibicaoRegistroSucesso" id="exibicaoRegistroSucesso">
            <i class="fas fa-check-circle"></i>
            <p>Verifique seu e-mail para confirmar sua conta</p>
          </div>
        `;
    return registroSucessoMensagem;
  },
};

// Objeto que cria de forma dinâmica os modos para Início de Sessão
export const modoInicioSecao = {
  confirmar: () => {
    const confirmeSeuEmailMsg = `
      <div class= "exibicaoError" id="exibicaoConfirmar">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Verifique sua caixa de entrada e confirme sua conta</p>
      </div>
    `;
    return confirmeSeuEmailMsg;
  },
  dadosInvalidos: () => {
    const emailOuSenhaInvalidosMsg = `
      <div class= "exibicaoError" id="exibicaoDadosInvalidos">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Você digitou um e-mail ou senha inválidos</p>
      </div>
    `;
    return emailOuSenhaInvalidosMsg;
  },
  usuarioInvalido: () => {
    const userInvalidoMsg = `
      <div class= "exibicaoError" id="exibicaoUsuarioInvalido">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Você não tem um registro</p>
      </div>
    `;
    return userInvalidoMsg;
  },
};
