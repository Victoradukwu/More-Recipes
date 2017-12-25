const emptyUsername = [
  {
    name: 'Jude',
    username: '',
    password: 'abc123',
    email: 'vic@andela.com'
  }
];

const emptyPassword = [
  {
    name: 'Jango',
    username: 'shrek',
    password: '',
    email: 'shrek@andela.com'
  }
];

const emptyEmail = [
  {
    name: 'Kiki',
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
    name: 'Frederick',
    username: 'fred',
    password: 'andela',
    confirmPassword: 'andela',
    email: 'fred@andela.com',
  },
  {
    name: 'Victor',
    username: 'victor',
    password: 'recipe',
    confirmPassword: 'recipe',
    email: 'victor@andela.com',
  },
  {
    name: 'Mr manager',
    username: 'abc&#123',
    password: 'andela',
    confirmPassword: 'andela',
    email: 'flyer@andela.com',
  },
  {
    name: 'Greeting',
    username: 'hi',
    password: 'password',
    confirmPassword: 'password',
    email: 'coder@andela.com',
  },
  {
    name: 'Lord vader',
    username: 'vader',
    password: 'gal',
    confirmPassword: '',
    email: 'vader01@gmail.com',
  },
  {
    name: 'luke skywalker',
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
    password: 'andela',
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
