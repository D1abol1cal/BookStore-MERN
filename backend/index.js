//0N88c7reGVsJjYUT

import express, { response } from 'express';
import { PORT, mongodbURL } from './config.js';
import mongoose from 'mongoose';
import { Book} from './models/bookModel.js';

const app = express(); 
app.use(express.json());


app.get('/', (request, response) => {
    console.log('Request received');
    return response.status(256).send('Hello, world!');

});

//Route to save a new book

app.post('/books', async (request, response) => {
    try {
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({message:'title, author, and publisherYear are required'});
           
        }
       
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);

       
        return response.status(201).send(book);


    }
    catch (error) {
        console.log('Error:', error.message);
        response.status(500).send({message:error.message});
    }


});

//Route to get all books
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find();
        return response.status(200).json({
            count:books.length,
            data:books
        });
    }
    catch(error) {
        console.log(error.message);
        request.status(500).send({message:error.message});
    }

})

//Route to get a single book
app.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);

        if(!book){
            return response.status(404).send({message:'Book not found'});
        }
        return response.status(200).json(book);
    }
    catch(error) {
        console.log(error.message);
        request.status(500).send({message:book});
    }

})

//Route to update a book
app.put('/books/:id', async (request, response) => {
    try {
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({message:'title, author, and publisherYear are required'});
        }
        const { id } = request.params
        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).send({message:'Book not found'});
        }
        else {
            return response.status(200).send({message:'Book updated successfully'});
        }


    }
       
    catch(error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

//Route to delete a book
app.delete('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).send({message:'Book not found'});
        }
        else {
            return response.status(200).send({message:'Book deleted successfully'});
        }
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

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