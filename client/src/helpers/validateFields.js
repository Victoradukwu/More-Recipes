const validateFields = (formFields) => {
  const fields = Object.keys(formFields);
  for (const field of fields) {
    if (formFields[field] === '' || !formFields[field]) { return false; }
  }
  return true;
};

export default validateFields;
