require('dotenv').config();
const express = require('express')
const app = express();
const PORT = 4000;
const mongoose = require ('mongoose');
mongoose.set('strictQuery', true);
const taskRouter = require('./routes/taskRouter')


//Middleware
app.use(express.json())

// routes
app.use("/api/v1/tasks", taskRouter)

//error route
app.use((req, res)=>{
    res.status(404).json({msg: "route not found"})
})


//database connection
const startServer = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, ()=>{
            console.log(`server runing on ${PORT}...`)
        })
   }catch (err){
    console.log(err)
}
};

startServer();