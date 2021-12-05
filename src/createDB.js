const dbBoards = require('./resources/boards/board.memory.repository');
const Board = require('./resources/boards/board.model');
const dbUsers = require('./resources/users/user.memory.repository');
const User = require('./resources/users/user.model');

const boards = [
  {
    id: '3769ae78-b5e0-4225-bd95-66943b8e6325',
    title: 'Autotest board',
    columns: [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 },
    ],
  },
  {
    id: '4dd1c8bf-747b-436c-bad3-ce64ad2348a4',
    title: 'Board 2',
    columns: [],
  },
];

const users = [
  {
    id: '7f4ba373-5ba1-4753-a37d-4f81fb4610ae',
    name: 'TEST_USER',
    login: 'test_user',
    password: 'T35t_P@55w0rd',
  },
  {
    id: 'ff8904b0-7768-4acb-9fc3-44d24cf62810',
    name: 'Bob',
    login: 'BobLoginA12345',
    password: '12345654',
  },
];

for (const item of users) {
  dbUsers.push(new User(item));
}

for (const item of boards) {
  let newBoard = new Board(item);

  dbBoards.push(newBoard);
}
