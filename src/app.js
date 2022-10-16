const express=require("express")
const mongoose=require('mongoose')
const app=express()
const route=require('./routes/route')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use(express.json())

app.use('/',route)

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true})
.then(()=>console.log("connected to database"))
.catch((err)=>console.log(err))

app.listen(3000,()=>{
    console.log('running on port 3000')
})

