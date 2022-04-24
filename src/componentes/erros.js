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