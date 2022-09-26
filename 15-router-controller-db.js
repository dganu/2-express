const utils = require('./MongoUtils')
const {MongoClient, ObjectId} = require("mongodb");

const getTasks = async (req, res) => {
  const dbo = utils.getDb();
  const query = {};
    //projection tells us which fields to include in the result
    //{projection:{_id:0,name:1,isMarried:1}}
    // sort can also be used sort({name:1})
    //limit 
   const cursor =  dbo.collection("tasks").find(query).limit(20).sort({id:1});
   const tasks = await cursor.toArray()
    console.log(tasks);
//    await cursor.forEach(doc => console.log(doc.name));
//       for await (const doc of cursor)
//         {console.log(doc.name,doc.age)}  
    //     while(await cursor.hasNext())
    //     {
    //         console.log(await cursor.next())
    //     }
    res.status(200).json({ success: true, data: tasks })
}

const createTask = (req, res) => {
    
  const {text,day,reminder,id,status} = req.body
  if (!text) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide text for Task ' })
  }
  const task = {
    text:text,
    day:day,
    reminder:reminder,
    id:id,
    status:status
  }
  const dbo = utils.getDb();
    dbo.collection("tasks").insertOne(task,(err,result)=>
    {
        if(err) throw err
        console.log(result.insertedId)
        res.status(201).send({ success: true, status:result.insertedId })
    })
 
  
}


const updateTask = async (req, res) => {
  const { id } = req.params
  const { reminderValue } = req.body
  const query = {"id":Number(id)}
  console.log("i am logging the query now",query)
  const dbo = utils.getDb();
  const task = await dbo.collection("tasks").findOne(query);
  if (!task) {
    return res
      .status(404)
      .json({ success: false, msg: `no tasks with id ${id}` })
  }
  console.log("is this making sense",task)
  const updatedTask = {reminder:reminderValue}
  dbo.collection("tasks").updateOne({"_id":ObjectId(task._id)},{$set:updateTask}).then((result)=>
  {
      console.log(result.modifiedCount)
      res.status(200).json({ success: true, data: result.modifiedCount })
  }).catch(err =>
      { 
          console.error(err);
      });
    
  
}
const getTask = async (req, res) => {
  const { id } = req.params
  const query = {"id":Number(id)}
  const dbo = utils.getDb();
  const task = await dbo.collection("tasks").findOne(query);
  console.log(task)
    if (!task) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` })
  }
   
  res.status(200).json({ success: true, data: task })
}

const deleteTask = (req, res) => {
  const {id} = req.params;
  const query = {id:Number(id)}
  const dbo = utils.getDb();
  dbo.collection("tasks").deleteMany(query).then((result)=>
  {
      console.log(result);
      return res.status(200).json({ success: true, data: result })
  }).catch(err =>
      {
          console.log(err)
          return res
          .status(404)
          .json({ success: false, msg: `no task with id ${req.params.id}` })
      
        });
  
  
}

module.exports = {
  getTasks,
  updateTask,
  deleteTask,
  createTask,
  getTask,
}
