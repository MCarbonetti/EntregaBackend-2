import passport from 'passport';
import local from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../dao/models/User.model.js';
import { createHash, isValidPassword } from '../utils/hash.js';

const LocalStrategy = local.Strategy;

passport.use('register', new LocalStrategy(
  { usernameField: 'email', passReqToCallback: true },
  async (req, email, password, done) => {
    try {
      const { first_name, last_name, age } = req.body;
      const user = await UserModel.findOne({ email });
      if (user) return done(null, false);
      const newUser = await UserModel.create({
        first_name,
        last_name,
        age,
        email,
        password: createHash(password)
      });
      return done(null, newUser);
    } catch (err) {
      return done(err);
    }
  }
));

passport.use('login', new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (!user || !isValidPassword(user, password)) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.use('jwt', new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'coderSecret'
  },
  async (jwt_payload, done) => {
    try {
      const user = await UserModel.findById(jwt_payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));
