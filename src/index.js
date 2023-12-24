const express = require('express')
const dotenv = require('dotenv')
const mongoose = require("mongoose");

dotenv.config()
const app = express()
const port = process.env.PORT || 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})  
console.log('process.env.MONGO_DB',process.env.MONGO_DB)

mongoose.connect(`mongodb+srv://quanglocdev:${process.env.MONGO_DB}@cluster0.xbjqykj.mongodb.net/?retryWrites=true&w=majority`)
    .then(() =>{
      console.log('connect db sucsess')
    })
    .catch((err) =>{
      console.log(err)
    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})