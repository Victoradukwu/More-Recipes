const emptyUsername = [
  {
    username: '',
    password: 'abc123',
    email: 'vic@andela.com'
  }
];

const emptyPassword = [
  {
    username: 'shrek',
    password: '',
    email: 'shrek@andela.com'
  }
];

const emptyEmail = [
  {
    username: 'shrek',
    password: 'abc123',
    email: '',
  }
];

const incorrectPassword = [
  {
    username: 'abc123',
    password: 'abc'
  }
];

const nullForm = [
  {
    username: 'sponge'
  }
];

const changePassword = [
  {
    password: 'passover',
  },
  {
    password: 'pass',
  },
  {

  },
];

const testValidUsers = [
  {
    username: 'fred',
    password: 'andela',
    confirmPassword: 'andela',
    email: 'fred@andela.com',
  },
  {
    username: 'victor',
    password: 'recipe',
    confirmPassword: 'recipe',
    email: 'victor@andela.com',
  },
  {
    username: 'abc&#123',
    password: 'andela',
    confirmPassword: 'andela',
    email: 'flyer@andela.com',
  },
  {
    username: 'hi',
    password: 'password',
    confirmPassword: 'password',
    email: 'coder@andela.com',
  },
  {
    username: 'vader',
    password: 'galaxy',
    confirmPassword: '',
    email: 'vader01@gmail.com',
  },
  {
    username: 'luke01',
    password: 'skywalker',
    confirmPassword: 'walker',
    email: 'luke01@gmail.com',
  },
  {

  }
];

const validUsersLogin = [
  {
    username: 'fred',
    password: 'andela',
  },

  {
    username: 'victor',
    password: 'recipe',
  },
];

const invalidUsers = [
  {
    username: 'kenny',
    password: 'merryone',
  },

  {
    username: 'jango',
    password: 'windy',
  },
];



export default {
  validUsersLogin,
  invalidUsers,
  testValidUsers,
  emptyUsername,
  emptyPassword,
  emptyEmail,
  incorrectPassword,
  nullForm,
  changePassword
};
