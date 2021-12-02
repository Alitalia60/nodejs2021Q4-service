const dbBoards = require('./resources/boards/board.memory.repository');
const dbUsers = require('./resources/users/user.memory.repository');

const boards = [
  {
    id: '3769ae78-b5e0-4225-bd95-66943b8e6325',
    title: 'Board 1',
    columns: 0,
  },
  {
    id: '4dd1c8bf-747b-436c-bad3-ce64ad2348a4',
    title: 'Board 2',
    columns: 0,
  },
  {
    id: '1e3cfb9b-ab55-4102-a8b3-d9c476eaa129',
    title: 'Board 3',
    columns: 0,
  },
  {
    id: 'f48e4939-a097-4d7f-bb09-0dd7eff58cf0',
    title: 'Board 4',
    columns: 0,
  },
  {
    id: '5f5b556b-db38-4fa7-8355-b3e7cb2f93e1',
    title: 'Board 5',
    columns: 0,
  },
  {
    id: '6031ec1f-97cc-4351-a94e-067c34fa4b60',
    title: 'Board 6',
    columns: 0,
  },
];

const users = [
  {
    id: '7f4ba373-5ba1-4753-a37d-4f81fb4610ae',
    name: 'Andrew',
    login: 'A12345',
    password: 'werwew',
  },
  {
    id: 'ff8904b0-7768-4acb-9fc3-44d24cf62810',
    name: 'Bob',
    login: 'BobLoginA12345',
    password: '12345654',
  },
  {
    id: '747e1cb7-a5c3-42ae-ab61-9e406542f7f3',
    name: 'Poll',
    login: 'Pollogin',
    password: 'rrterte',
  },
  {
    id: '92242d26-bc9b-4a51-9e55-0d4eb53bd642',
    name: 'Vitas',
    login: 'Vit_log',
    password: '44444wew',
  },
  {
    id: 'ea8de514-7a67-40ea-b24d-4d4091f9a5c6',
    name: 'John',
    login: 'Main_John',
    password: 'wrteeterwew',
  },
];

for (const item of users) {
  dbUsers.push(item);
}
for (const item of boards) {
  dbBoards.push(item);
}
