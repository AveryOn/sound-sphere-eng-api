import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:8080'

// Включаем CORS для всех источников
app.use(cors({
  origin: [
    'https://dev.sound-sphere-eng.xyz-avery.online',
    'https://sound-sphere-eng.xyz-avery.online',
    'http://localhost:4555',
    'http://localhost:4556',
    'http://localhost:4552',
    'http://localhost:4553',
    'http://localhost:4554',
    'http://localhost:4557',
    'http://localhost:4558',
  ],
}));

app.get('/ping', (req, res) => {
  res.send('Hello World!as');
});

app.get('/api/v2/ping', (req, res) => {
  res.send('[PING] V2');
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
