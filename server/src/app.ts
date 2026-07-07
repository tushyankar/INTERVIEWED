import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes/index.js';

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

export default app;