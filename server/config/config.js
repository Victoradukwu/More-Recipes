require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'andela',
    database: 'More-Recipes',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: process.env.TEST_DATABASE_PASSWORD,
    database: 'Testdb',
    host: '127.0.0.1',
    dialect: 'postgres',
    // use_env_variable: 'TEST_DATABASE_URL',
    // dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
