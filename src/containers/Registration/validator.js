export default (values) => {
  const errors = {};

  if (!values.get('email')) {
    errors.email = 'Campo obbligatorio';
  } else if (!/^[\w.-]+(\+\w+)?@[\w.-]+\.[\w.]{2,}$/i.test(values.get('email'))) {
    errors.email = 'Indirizzo email non valido';
  }

  if (!values.get('password')) {
    errors.password = 'Campo obbligatorio';
  } else if (values.get('password').length < 10) {
    errors.password = 'Deve essere di almeno 10 caratteri';
  }

  if (!values.get('password2')) {
    errors.password2 = 'Campo obbligatorio';
  } else if (values.get('password') !== values.get('password2')) {
    errors.password2 = 'Le password non coincidono';
  }

  return errors;
};
