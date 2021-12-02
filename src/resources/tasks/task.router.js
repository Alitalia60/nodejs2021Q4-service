const Router = require('koa-router')
const taskService = require('./task.service')

const taskRouter = new Router();


//Tasks-------------------------------
//TODO
taskRouter.get('/tasks', taskService.getTaskList);

//TODO
taskRouter.get('/tasks/:taskId', async (ctx, next) => {
    console.log('GET');
    taskService.getTask;
    next()
})

//TODO
taskRouter.post('/tasks', async (ctx, next) => {
    // console.log('POST');
    next()
})

//TODO
taskRouter.put('/tasks/:taskId', async (ctx, next) => {
    // console.log('PUT');
    next()
})

//TODO
taskRouter.del('/tasks/:taskId', async (ctx, next) => {
    // console.log('DEL');
    next()
})

module.exports = taskRouter


