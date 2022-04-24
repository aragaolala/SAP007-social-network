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
    }
};