import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:8080'

if (['prod', 'dev'].includes(process.env.NODE_ENV || '')) {
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    console.log('Origin:', origin);
  
    // Пример: блочим всё, кроме нужного
    if (!origin || origin !== CLIENT_URL) {
      res.status(403).send('Origin not allowed');
      return
    }
    next();
  });
}

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
