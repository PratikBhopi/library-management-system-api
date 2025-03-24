const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const BooksRouter = require('./routes/Books.routes');
const UserRouter = require('./routes/Users.routes');
const AuthorController = require('./routes/Authors.routes');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/books', BooksRouter);
app.use('/users', UserRouter);
app.use('/authors', AuthorController);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
}); 

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
