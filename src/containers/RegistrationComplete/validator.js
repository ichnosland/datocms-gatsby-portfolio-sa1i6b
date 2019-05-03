export default (values) => {
  const errors = {};

  if (!values.get('nome')) {
    errors.nome = 'Campo obbligatorio';
  } else if (values.get('nome').length < 2) {
    errors.nome = 'Deve essere di almeno 2 caratteri';
  }

  if (!values.get('cognome')) {
    errors.cognome = 'Campo obbligatorio';
  } else if (values.get('cognome').length < 2) {
    errors.cognome = 'Deve essere di almeno 2 caratteri';
  }

  return errors;
};
