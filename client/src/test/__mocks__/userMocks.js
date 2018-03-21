export default {
  authUserReqObj: {
    name: 'Ayo',
    username: 'ayo',
    email: 'ayo@andela.com',
    password: 'andela',
    confirmPassword: 'andela'
  },
  crateUserResObj: {
    status: '',
    message: '',
    token: '',
    user: {
      id: 1,
      name: '',
      username: '',
      phoneNumber: null,
      location: '',
      profilePicture: '',
      designation: null,
      email: '',
      password: '',
      createdAt: '',
      updatedAt: ''
    }
  },
  authUserFailResObj: {
    status: 'fail',
    message: 'sometexts'
  },
};
