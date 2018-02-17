//Remove spaces from any string 
const cleanString = (str) => {
  const clean = str.replace(/\s/g, '');
  return clean;
};

export default cleanString;
