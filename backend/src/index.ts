import cors from 'cors';
import express from 'express';

import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Allow both origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.use(express.json());
app.use('/api/v1', routes);
app.use('/test', (_req, res) => {
  res.json({ msg: 'hello' });
  return;
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
