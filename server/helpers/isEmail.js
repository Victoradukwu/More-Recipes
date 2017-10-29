const isEmail = (str) => {
  const exp = /([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})/;
  if (str.match(exp) || !str.length) {
    return true;
  }
  return false;
};

export default isEmail;
