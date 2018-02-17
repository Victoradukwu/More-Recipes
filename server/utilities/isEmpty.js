const isEmpty = (str) => {
  const exp = /^[ ]+$/;
  if (str.match(exp) || !str.length) {
    return true;
  }
  return false;
};

export default isEmpty;
