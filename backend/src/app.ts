import express from 'express';
const app = express();
const port = 8000;
import cors from 'cors';

require('dotenv').config();
import { Pool } from 'pg';

async function createAndConnectToDatabase() {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    port: 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const client = await pool.connect();
    console.log('Connected to database');
    return client;
  }
  catch (err) {
    console.error('Failed to connect to database');
    console.error(err);
    return null;
  }
}

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};

// enable cors
app.use(cors(corsOptions));
const client = createAndConnectToDatabase();

const middleware = require('./middleware/index.ts');
// comenteaza daca lucrezi doar la backend
// app.use(middleware.decodeToken);

const userRoutes = require('./routes/userRoutes.ts');
const quizzRoutes = require('./routes/quizzRoutes.ts');
const chatRoutes = require('./routes/chatRoutes.ts');

app.use('/user', userRoutes);
app.use('/quizz', quizzRoutes);
app.use('/chat', chatRoutes);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

module.exports = app;