import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', passport.authenticate('register', { session: false }), (req, res) => {
  res.send({ status: 'success', message: 'Usuario registrado' });
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user) => {
    if (err || !user) return res.status(401).send({ status: 'error', message: 'Login fallido' });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, 'coderSecret', { expiresIn: '1h' });
    res.send({ status: 'success', token });
  })(req, res, next);
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send({ status: 'success', user: req.user });
});

export default router;
