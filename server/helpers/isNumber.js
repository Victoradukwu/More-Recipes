const isNumber = (str) => {
  const exp = /^[0-9]+$/;
  if (str.match(exp)) {
    return true;
  }
  return false;
};

export default isNumber;
