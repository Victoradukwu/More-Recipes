import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.load();
const secret = process.env.secret;

const generateToken = (user) => {
  const payload = {
    id: user.id
  };
  const token = jwt.sign(payload, secret, { expiresIn: '24h' });
  return token;
};

export default generateToken;
