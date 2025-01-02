import { Router } from 'express';
import { registerUser } from '../handlers/user/register';
import { loginUser } from '../handlers/user/login';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
