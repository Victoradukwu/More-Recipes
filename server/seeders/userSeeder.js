// const emptyUsername = [
//   {
//     name: 'Jude',
//     username: '',
//     password: 'abc123',
//     email: 'vic@andela.com'
//   }
// ];

// const emptyPassword = [
//   {
//     name: 'Jango',
//     username: 'shrek',
//     password: '',
//     email: 'shrek@andela.com'
//   }
// ];

// const emptyEmail = [
//   {
//     name: 'Kiki',
//     username: 'shrek',
//     password: 'abc123',
//     email: '',
//   }
// ];

// const incorrectPassword = [
//   {
//     username: 'abc123',
//     password: 'abc'
//   }
// ];

// const changePassword = [
//   {
//     password: 'passover',
//   },
//   {
//     password: 'pass',
//   },
//   {

//   },
// ];

// const testValidUsers = [
//   {
//     name: 'Frederick',
//     username: 'fred',
//     password: 'andela',
//     confirmPassword: 'andela',
//     email: 'fred@andela.com',
//   },
//   {
//     name: 'Victor',
//     username: 'victor',
//     password: 'andela',
//     confirmPassword: 'andela',
//     email: 'victor@andela.com',
//   },
//   {
//     name: 'Mr manager',
//     username: 'abc&#123',
//     password: 'andela',
//     confirmPassword: 'andela',
//     email: 'flyer@andela.com',
//   },
//   {
//     name: 'Greeting',
//     username: 'hi',
//     password: 'password',
//     confirmPassword: 'password',
//     email: 'coder@andela.com',
//   },
//   {
//     name: 'Lord vader',
//     username: 'vader',
//     password: 'gal',
//     confirmPassword: '',
//     email: 'vader01@gmail.com',
//   },
//   {
//     name: 'luke skywalker',
//     username: 'luke01',
//     password: 'skywalker',
//     confirmPassword: 'walker',
//     email: 'luke01@gmail.com',
//   },
//   {

//   }
// ];

// const validUsersLogin = [
//   {
//     username: 'fred',
//     password: 'andela',
//   },

//   {
//     username: 'victor',
//     password: 'andela',
//   },
// ];

// const invalidUsers = [
//   {
//     username: 'kenny',
//     password: 'merryone',
//   },

//   {
//     username: 'fred',
//     password: 'ande',
//   },
// ];

// export default {
//   validUsersLogin,
//   invalidUsers,
//   testValidUsers,
//   emptyUsername,
//   emptyPassword,
//   emptyEmail,
//   incorrectPassword,
//   changePassword
// };


const userSeeder = {
  jude: {
    name: 'Jude', // emptyUsername
    username: '',
    password: 'abc123',
    email: 'vic@andela.com'
  },
  Jango: { // empty password
    name: 'Jango',
    username: 'shrek',
    password: '',
    email: 'shrek@andela.com'
  },
  Kiki: { // empty email
    name: 'Kiki',
    username: 'shrek',
    password: 'abc123',
    email: '',
  },
  wrongPassword: {
    username: 'abc123', // IncorrectPassword[0]
    password: 'abc'
  },
  Frederick: {
    name: 'Frederick', // testValidUsers[0]
    username: 'fred',
    password: 'andela',
    confirmPassword: 'andela',
    email: 'fred@andela.com',
  },
  Victor: {
    name: 'Victor', // testValidusers[1]
    username: 'victor',
    password: 'andela',
    confirmPassword: 'andela',
    email: 'victor@andela.com',
  },
  MrManager: {
    name: 'Mr manager', // testValidUsers[2]
    username: 'abc&#123',
    password: 'andela',
    confirmPassword: 'andela',
    email: 'flyer@andela.com',
  },
  Greeting: {
    name: 'Greeting', // testValidUsers[3]
    username: 'hi',
    password: 'password',
    confirmPassword: 'password',
    email: 'coder@andela.com',
  },
  LordVader: {
    name: 'Lord vader', // testValidUsers[4]
    username: 'vader',
    password: 'gal',
    confirmPassword: '',
    email: 'vader01@gmail.com',
  },
  lukeSkywalker: {
    name: 'luke skywalker', // testValidUsers[5]
    username: 'luke01',
    password: 'skywalker',
    confirmPassword: 'walker',
    email: 'luke01@gmail.com',
  },
  validLogin1: {
    username: 'fred', // validUsersLogin[0]
    password: 'andela',
  },
  validLogin2: {
    username: 'victor', // validUsersLogin[1]
    password: 'andela'
  },
  invalidLogin1: {
    username: 'kenny', // invalidUsers[0]
    password: 'merryone',
  },
  invalidLogin2: {
    username: 'fred', // invalidUsers[1]
    password: 'ande',
  }
};


export default userSeeder;

