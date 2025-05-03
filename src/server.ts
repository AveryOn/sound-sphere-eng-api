import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Включаем CORS для всех источников
app.use(cors({
    origin: 'http://localhost:4556',
}));

app.get('/ping', (req, res) => {
  res.send('Hello World! (UPD)123');
});

app.get('/api/v2/ping', (req, res) => {
  res.send('[PING] V2');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
