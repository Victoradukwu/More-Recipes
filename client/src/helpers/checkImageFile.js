/**
 * @description gets mimetype of images
 * @function getMimetype
 *
 * @param   { string } signature - first 8 bytes of a buffer image
 *
 * @returns { string } original image mimetype
 */
const getMimetype = (signature) => {
  switch (signature) {
    case '89504E47':
      return 'image/png';
    case '47494638':
      return 'image/gif';
    case 'FFD8FFDB':
    case 'FFD8FFE0':
    case 'FFD8FFE1':
      return 'image/jpeg';
    case '25504446':
      return 'application/pdf';
    case '504B0304':
      return 'application/zip';
    default:
      return 'Unknown filetype';
  }
};

/**
 * @description extract first 8 characters of the uploaded file
 * @function imageFileChecker
 *
 * @param   { function } filereader - javascript gbobal function for
 * reading input files
 * @param   { object } file - upload file
 * @param   { function } callback - collects output for use elsewhere
 *
 * @returns { * } null
 */
const imageFileChecker = (filereader, file, callback) => {
  filereader.onload = (event) => {
    const uint = new Uint8Array(event.target.result);
    const bytes = [];
    uint.forEach((byte) => {
      bytes.push(byte.toString(16));
    });
    const hex = bytes.join('').toUpperCase();
    const fileType = getMimetype(hex);
    callback(fileType);
  };
  const blob = file.slice(0, 4);
  filereader.readAsArrayBuffer(blob);
};
export default imageFileChecker;
