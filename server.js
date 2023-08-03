const app = require('./app')
const mongoose = require('mongoose')
const DB_HOST = "mongodb+srv://NikDen:213233@cluster0.ea1an8u.mongodb.net/Contacts_reader?retryWrites=true&w=majority"
mongoose.set('strictQuery', false)
mongoose.connect(DB_HOST)
  .then(()=>{
    console.log("Database connect success!")
    app.listen(3000)
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })

