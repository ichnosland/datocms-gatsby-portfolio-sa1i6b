export default (values) => {
  const errors = {};

  if (!values.get('codice')) {
    errors.codice = 'Campo obbligatorio';
  }

  return errors;
};
