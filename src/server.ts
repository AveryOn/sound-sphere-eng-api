import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config()
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { usersTable } from './db/schema';

const client = createClient({ 
  url: process.env.DB_FILE_NAME! 
});
const db = drizzle({ client });

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

/* 
  ### USERS
*/
app.post('/api/v1/users/create', async (req, res) => {
  const userData = req.body
  userData.id = crypto.randomUUID()
  userData.createdAt = new Date().toISOString()
  userData.updatedAt = new Date().toISOString()
  const data = await db.insert(usersTable).values(userData);
  res.send(data);
});

app.get('/api/v1/users/', async (req, res) => {
  const users = await db.select().from(usersTable)
  res.send(users)
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
