# RS School REST service

### Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

### Downloading

git clone {repository URL}

## if task is "REST API service"

git checkout task4

## if task is "typescript-basic"

git checkout task5

## if task is "typescript-basic-logger"

git checkout task6

### Installing NPM modules

npm install

### Building application

npm run build

### Building & Running application in development mode

npm run start:dev

### Running application in production mode

npm run start:prod

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.


*** WARNING ***

To use logging set environment:

* create folder dist/log
* LOG_STDOUT = true  - enable loggin to stdout
* LOG_FILE = true    - enable loggin to file 'dist/src/trace.log'
* LOG_LEVEL = info   - level of loggin 

### Testing

After application running open new terminal and enter:

**To run all tests without authorization**

npm run test

**To run only one of all test suites (users, boards or tasks)**

npm test boards.test
npm test users.test
npm test tasks.test

### USAGE

**User (/users route)**

- GET /users - get all users (remove password from response)

- GET /users/:userId - get the user by id (ex. “/users/123”) (remove password from response)

- POST /users - create user

- PUT /users/:userId - update user

- DELETE /users/:userId - delete user

**Board (/boards route)]**

- GET /boards - get all boards

- GET /boards/:boardId - get the board by id

- POST /boards - create board

- PUT /boards/:boardId - update board

- DELETE /boards/:boardId - delete board

**Task (boards/:boardId/tasks route)**

- GET boards/:boardId/tasks - get all tasks

- GET boards/:boardId/tasks/:taskId - get the task by id

- POST boards/:boardId/tasks - create task

- PUT boards/:boardId/tasks/:taskId - update task

- DELETE boards/:boardId/tasks/:taskId - delete task
