import { Router } from 'express';
import * as authController from '../controllers/authController';
import { protect } from '../middlewares/auth';
import { authLimiter } from '../middlewares/rateLimiter';
import passport from 'passport';

const router = Router();

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', protect as any, authController.logout as any);
router.post('/logout-all', protect as any, authController.logoutAll as any);
router.post('/change-password', protect as any, authController.changePassword as any);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), (req: any, res) => {
  res.redirect(`${process.env.CORS_ORIGIN}/auth-success?token=${req.user.id}`);
});

export default router;
