import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config()
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({ 
  url: process.env.DB_FILE_NAME! 
});
const db = drizzle({ client });

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());

// Включаем CORS для всех источников
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.get('/ping', (req, res) => {
  res.send('Hello World!as');
});

app.get('/api/v2/ping', (req, res) => {
  res.send('[PING] V2');
});

app.get('/api/auth/check', (req, res) => {
  console.log(req.cookies)
  if(req.cookies['token'] === 'abc123') {
    res.send({
      id: 'abc123',
      username: 'alex.id',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }); return
  }
  else {
    res.status(401).send({ message: 'Unauthorized' }); return
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
