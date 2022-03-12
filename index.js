import express from 'express'
import models from './models/index.js'
import mongoose from "mongoose"

const port = 5000;
const app = express();
app.use(express.json());
const log = (msg) => console.log(msg);
const uri = 'mongodb://localhost:27017/parcelkoi';
const options = {};
const connectWithDb = ()=> {
    mongoose.connect(uri,options, (err, db)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("DB Connected");
        }
    })
}
connectWithDb();
// app.get("/", (req, res) =>{
//     res.send("Hello viewers " + req.query?.id)
// })
app.post("/", (req, res) =>{
    const user = new models.User({username: req.body.username, createdAt:Date()})
    user.save().then(savedUser =>{
        res.status(200).send("User saved ID: " + savedUser._id)
    }).catch(error =>{
        res.status(500).send(error);
    })
    
})
app.listen(port, ()=>{
    console.log('app listen to port ' + port);
})
log(models)
