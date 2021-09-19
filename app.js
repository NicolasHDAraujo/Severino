import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import express from 'express';
import userRoutes from './src/routes/userRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import serviceRoutes from './src/routes/serviceRoutes';
import imageRoutes from './src/routes/imageRoutes';
import scheduleRoutes from './src/routes/scheduleRoutes';
import assessmentRoutes from './src/routes/assessmentRoutes';
import addressRoutes from './src/routes/addressRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/services/', serviceRoutes);
    this.app.use('/images/', imageRoutes);
    this.app.use('/schedules/', scheduleRoutes);
    this.app.use('/assessments/', assessmentRoutes);
    this.app.use('/address/', addressRoutes);
  }
}

export default new App().app;
