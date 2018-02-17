const isAlphaNumeneric = (str) => {
  const exp = /^[A-Za-z0-9]+$/;
  if (str.match(exp)) {
    return true;
  }
  return false;
};

export default isAlphaNumeneric;
