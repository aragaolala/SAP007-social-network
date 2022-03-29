export function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const expression = /^([\.\_a-zA-Z0-9]+)@([a-zA-A]+)\.([a-zA-Z]){2,8}/;

  if (!email) {
    return false;
  }

  // return expression.test(email.trim());

  return typeof email === 'string'
    ? expression.test(email.trim())
    : expression.test(`${email}`);
}

export function validatePassword(password) {
  // A senha deve ter entre 8 a 14 caracteres

  const expression = /^.{6,14}$/;

  if (!password) {
    return false;
  }

  return typeof password === 'string'
    ? expression.test(password.trim())
    : expression.test(`${password}`);
}

export function validateField(field) {
  if (typeof field !== 'string') {
    return false;
  }
  if (field.trim().length <= 0) {
    return false;
  }

  return true;
}

