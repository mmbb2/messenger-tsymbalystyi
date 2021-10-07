require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./router/index.js')


const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);



const start = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, ()=>{
            console.log('server is running')
        })
    }
    catch(e){
        console.log(e);
    }
}



start();