//0N88c7reGVsJjYUT

import express, { response } from 'express';
import { PORT, mongodbURL } from './config.js';
import mongoose from 'mongoose';
import { Book} from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';

const app = express(); 
app.use(express.json());


app.get('/', (request, response) => {
    console.log('Request received');
    return response.status(256).send('Hello, world!');

});
app.use('/books', booksRoute);


mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
        
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    });