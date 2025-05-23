import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

// Включаем CORS для всех источников
app.use(cors({
  origin: '*',
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
