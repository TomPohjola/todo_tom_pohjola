import { selectAllTasks } from '../models/Task.js'
import { insertTasks } from '../models/Task.js'
import { ApiError } from '../helper/apierror.js'

const getTasks = async (req, res,next) => {
 try {
 const result = await selectAllTasks()
 return res.status(200).json(result.rows || [])
 } catch (error) {
 return next(error)
 }
}


const insertTask = async (task, req, res,next) => {
 try {
console.log("inserttaskissa ja description "+task.description)

 const result = await insertTasks(task.description)

 //console.log(JSON.stringify(result))


 return result
 
 } catch (error) {
 return console.error(error)
 }
}

const postTask = async (req, res,next) => {
 const { task } = req.body
 console.log("Task to create:", task)
 try {
 if (!task || !task.description || task.description.trim().length === 0) {
 return next(new ApiError('Task description is required', 400))
 /* const error = new Error('Task description is required')
 error.status = 400
 return next(error) */
 }
 console.log("tässä on task "+ task.description)
 const result = await insertTask(task)
 console.log("tässä on result posttaskissa "+JSON.stringify(result.rows[0]))
 
 return res.status(201).json({id: result.rows[0].id, description: result.rows[0].description})
 } catch (error) {
    console.log("virheessä")
    return next(error)
 }
}

export { getTasks, postTask, insertTask }
