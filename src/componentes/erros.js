//  Objeto que cria de forma dinâmica os modos para Registro

export const funcRegistro = {

  emailInvalido: () => {
    const invalidoEmailMsg = `
      <div class= "exibicaoError" id="exibicaoemailInvalido">
        <p>E-mail inválido</p>
      </div>
    `;
    return invalidoEmailMsg;
  },

  emailExistente: () => {
    const msgEmailJaExistente = `
      <div class= "exibicaoError" id="exibicaoEmailExistente">
        <p>Esse e-mail já existe</p>
      </div>
    `;
    return msgEmailJaExistente;
  },

  senhaInvalida: () => {
    const msgSenhaFraca = `
      <div class= "exibicaoError" id="exibicaoSenhaInvalida">
        <p>A senha deve conter pelo menos 6 caracteres</p>
      </div>
    `;
    return msgSenhaFraca;
  },

  registroSucesso: () => {
    const registroSucessoMensagem = `
      <div class= "exibicaoRegistroSucesso" id="exibicaoRegistroSucesso">
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
        <p>Verifique sua caixa de entrada e confirme sua conta</p>
      </div>
    `;
    return confirmeSeuEmailMsg;
  },
  dadosInvalidos: () => {
    const emailOuSenhaInvalidosMsg = `
      <div class= "exibicaoError" id="exibicaoDadosInvalidos">
        <p>Você digitou um e-mail ou senha inválidos</p>
      </div>
    `;
    return emailOuSenhaInvalidosMsg;
  },

  usuarioInvalido: () => {
    const userInvalidoMsg = `
      <div class= "exibicaoError" id="exibicaoUsuarioInvalido">
        <p>Você não tem um registro</p>
      </div>
    `;
    return userInvalidoMsg;
  },
};
