const Tasks = require("../model/tasks");
const asyncWrapper = require('../middleware/async')


// get all the tasks
const getAllTasks = asyncWrapper(async(req, res)=>{
    // try{
        const tasks = await Tasks.find();
        res.status(200).json({numoftasks:tasks.length,tasks});
    // }catch(err){
    //     res.status(500).json({msg:"err"});
    // }
// };
});

//get a single task - req.params -taskId
const getTask = asyncWrapper (async(req, res) =>{
    // res.send ('task got');
    const {taskId} = req.params;
    // try{
        const task = await Tasks.findOne({_id:taskId});
        if (!task){
            return res.status (404).json({msg:`Task with the id : ${taskId} not found`})
        }
        res.status(200).json({task})
//     }catch (err){
//         console.log(err);
//         res.status (500).json({msg: "an err occured"})
//     }
// }
    });

// create task
const createTask = asyncWrapper (async(req, res) =>{
    // res.send ('create task');
    // try{
        const {title, priority} = req.body
        if (!title || !priority){
            return res.status(400).json({msg: "Please provide necessary information"})
        }
        const task = await Tasks.create(req.body)
        res.status(201).json({msg: "task created", task})
    // }catch (err){
    //     console.log(err)
    //     res.status(500).json({msg: "An error occured"})
    // }
});
// update
const updateTask= asyncWrapper (async(req, res) =>{
    // res.send ('update task');
    const {title, priority} = req.body
    const {taskId} = req.params

    // try{
        const task = await Tasks.findOneAndUpdate({_id: taskId}, req.body, {new:true, runValidators:true,})
        if(!task)
        res.status(200).json ({msg: 'task updated'})

    // }catch (err){
    //     console.log(err)
    //     res.status(500).json({msg: 'cant update'})
    // }
});
// delete
const deleteTask= asyncWrapper (async(req, res) =>{
    // res.send ('delete task');
    const {taskId} = req.params
    // try{

        const task = await Tasks.findByIdAndDelete({_id:taskId});
        if (!task){
        return res.status (404).json({msg:`Task not found`})
    }
    res.status(200).json({msg: 'Task Deleted Successfully', task})
// }   catch(err) {
//     res.status(500).json({msg: 'An error occurred'})
// }

});  

// exports
module.exports =  { getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    createTask}