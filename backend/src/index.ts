import cors from 'cors';
import express from 'express';

import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies or authentication headers
  }),
);

app.use(express.json());
app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
