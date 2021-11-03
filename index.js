import express, { application } from 'express';
import path from 'path';
import { requestTime, logger } from './middlewares.js';
import serverRoutes from './routes/servers.js';

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'ejs')); //change direction to ejs

console.log(app.get('views'));

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestTime);
app.use(logger);

app.use(serverRoutes);

app.get('/', (req, res) => {
  res.render('index', { title: 'main page', active: 'main' });
});

app.get('/features', (req, res) => {
  res.render('features', { title: 'features page', active: 'features' });
});

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
// });

app.get('/download', (req, res) => {
  res.download(path.resolve(__dirname, 'static', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server has been started at the port ${PORT}...`);
});
