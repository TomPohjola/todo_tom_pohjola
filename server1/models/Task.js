import { pool } from '../helper/db.js'

const selectAllTasks = async () => {
 return await pool.query('SELECT * FROM task')
}
const insertTasks = async (task) => {
console.log("toimiiko "+task)
 return await pool.query('insert into task (description) values ($1) returning *', [task])
}

export { selectAllTasks, insertTasks }