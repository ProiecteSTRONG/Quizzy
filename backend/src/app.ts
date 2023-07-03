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


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
