import express from 'express';
import auth from '../middlewares/auth';
import { signup, changePassword, signin } from '../controllers/user';
import { basicValidation, validateUsername, emailValidation, validatePassword } from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v1/users/signup', basicValidation, validateUsername, emailValidation, validatePassword, signup);
router.post('/api/v1/users/signin', signin);
router.put('/api/v1/users/changepassword', auth, changePassword);

export default router;
