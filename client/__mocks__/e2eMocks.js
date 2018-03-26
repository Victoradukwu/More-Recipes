const faker = require('faker');

module.exports = {
  name: faker.name.findName(),
  username: faker.random.alphaNumeric(8),
  email: faker.internet.email(),
  email2: faker.internet.email(),
  password: faker.random.alphaNumeric(8),
  password2: faker.random.alphaNumeric(8),
  confirmPassword: faker.random.alphaNumeric(8),
  recipeName: faker.lorem.words(2),
  recipeName2: faker.lorem.words(),
  ingredients: faker.lorem.words(6),
  instructions: faker.lorem.sentences(),
  validSearch: 'Jameson',
  invalidSearch: 'aaaaaaaaaaaaaaaaa',
  review: faker.lorem.paragraphs(2),
};
