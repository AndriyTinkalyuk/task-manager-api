import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import router from './router.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.json());

app.use('/api', router);

async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        console.log("DB NAME >>>", mongoose.connection.db.databaseName);
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}/`);
          });
    } catch (error) {
        console.error(error);
    }
}

startApp();