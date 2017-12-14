const isNumber = (str) => {
  const exp = /^[0-9]+$/;
  if (exp.test(str)) {
    return true;
  }
  return false;
};

export default isNumber;
