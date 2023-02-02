require('dotenv').config();
const express = require('express')
const app = express();
const PORT = 4000;
const mongoose = require ('mongoose');
mongoose.set('strictQuery', true);
const taskRouter = require('./routes/taskRouter')
const notFound = require('./middleware/notFoundRoute');
const errorHandler = require('./middleware/errorHandler')



//Middleware
app.use(express.json())

// routes
app.use("/api/v1/tasks", taskRouter)
app.use(errorHandler)

//error route
app.use((req, res)=>{
    res.status(404).json({msg: "route not found"})
})
app.use(notFound)


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