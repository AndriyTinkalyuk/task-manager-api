import express from 'express';

import router from './routes/index.js';
import cors from 'cors';
import ErrorHandling from './middleware/ErrorHandlingMiddleWare.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use(ErrorHandling);

export default app;