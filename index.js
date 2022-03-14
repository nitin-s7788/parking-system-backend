import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/slots.js";

const app = express();

dotenv.config();  // now it will read process.env.variablename from .env file

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use("/slot", userRouter);

app.get('/', (req, res) => {
    res.send("Backend is working");
});

// const CONNECTION_URL = 'mongodb+srv://username:password@cluster0.l0uz4.mongodb.net/databasename?retryWrites=true&w=majority';   write this in .env file
const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);