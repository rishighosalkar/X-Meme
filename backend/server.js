const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

const cloud_uri = process.env.ATLAS_URI;
const local_uri = "mongodb://localhost:27017/users";
console.log(process.env.NODE_ENV)
/*
if(process.NODE_ENV === 'production')
{
  mongoose.connect(local_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
  console.log("Done")
}
else if(process.env.NODE_ENV === 'development')
  mongoose.connect(cloud_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
*/
mongoose.connect(local_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/memes');
app.use('/memes', usersRouter);

 
app.listen(port, () => 
    console.log('Server is running on port:', port)
);