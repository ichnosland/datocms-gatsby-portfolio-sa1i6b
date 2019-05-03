export default (values) => {
  const errors = {};

  if (!values.get('password')) {
    errors.password = 'Campo obbligatorio';
  }

  if (!values.get('email')) {
    errors.email = 'Campo obbligatorio';
  } else if (!/^[\w.-]+(\+\w+)?@[\w.-]+\.[\w.]{2,}$/i.test(values.get('email'))) {
    errors.email = 'Indirizzo email non valido';
  }

  return errors;
};
