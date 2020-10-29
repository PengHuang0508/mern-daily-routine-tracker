const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
// routes
const userRouter = require('./routes/user');
const dailyRoutineRouter = require('./routes/dailyRoutine');

require('dotenv').config();

// Create express server
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to mongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.info('MongoDB database connection established successfully.');
});

// APIs
app.use('/user', userRouter);
app.use('/daily-routine', dailyRoutineRouter);

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build'));
});

app.listen(port, () => {
  console.info(`Server is running on port: ${port}`);
});
