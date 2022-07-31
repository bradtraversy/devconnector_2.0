const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

import express from 'express';
import connectDB from './config/db.js';
import path from 'path';
import userRoute from './routes/api/users.js';
import profileRoute from './routes/api/profile.js';
import authRoute from './routes/api/auth.js';
import postRoute from './routes/api/post.js';


const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute );
app.use('/api/profile', profileRoute);
app.use('/api/posts', postRoute);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
