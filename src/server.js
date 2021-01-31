const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const order = require('./router/customer');
const db = "mongodb+srv://priyadharshini:Priya_7140@cluster0.hx9z8.mongodb.net/shopping_cart?retryWrites=true&w=majority";
const port = 3000;

const app = express();
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(db,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(()=>{
    console.log("mongodb connected");
}).catch((err)=>{
    console.log({err: err });
})

app.use('/orders',order);

app.listen(port,(err)=>{
if(err){
    console.log( {err : err});
}
console.log("server running on port" +port);
});