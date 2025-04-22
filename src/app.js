import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport();
app.use(passport.initialize());

app.use('/api/sessions', sessionsRouter);

const PORT = 8080;

const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce');
    console.log('DB connected');
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

connect();
