export const resetPasswordValidator = (values) => {
  const errors = {};

  if (!values.get('email')) {
    errors.email = 'Campo obbligatorio';
  } else if (!/^[\w.-]+(\+\w+)?@[\w.-]+\.[\w.]{2,}$/i.test(values.get('email'))) {
    errors.email = 'Indirizzo email non valido';
  }

  return errors;
};


export const passwordSetValidator = (values) => {
  const errors = {};
  const pwd1 = values.get('password_new_1');
  const pwd2 = values.get('password_new_2');

  if (!pwd1) {
    errors.password_new_1 = 'Campo obbligatorio';
  } else if (pwd1.length < 10) {
    errors.password_new_1 = 'Deve essere di almeno 10 caratteri';
  }

  if (!pwd2) {
    errors.password_new_2 = 'Campo obbligatorio';
  } else if (pwd2.length < 10) {
    errors.password_new_2 = 'Deve essere di almeno 10 caratteri';
  } else if (pwd1 !== pwd2) {
    errors.password_new_2 = 'Le due password devono essere uguali';
  }

  return errors;
};

export const required = (value) => value ? undefined : 'Obbligatorio';
