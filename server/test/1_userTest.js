import 'chai';
import 'mocha';
import supertest from 'supertest';
import app from '../../bin/www';
import users from '../Seeders/userSeeder';
import dbSync from '../helpers/clearDb';

const testValidUsers = users.testValidUsers,
  validUsersLogin = users.validUsersLogin,
  invalidUsers = users.invalidUsers,
  emptyUsername = users.emptyUsername,
  emptyPassword = users.emptyPassword,
  incorrectPassword = users.incorrectPassword,
  nullForm = users.nullForm;

const clearDb = dbSync.clearDb,
  server = supertest.agent(app),
  expect = require('chai').expect;


clearDb();

describe('Test Server Connection', () => {
  it('should respond with Status connected ok', (done) => {
    server
      .get('/api')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.body.message).to.equal('Status connected ok');
        expect(res.statusCode).to.equal(200);
        if (err) return done(err);
        done();
      });
  });
});

describe('Response Object', () => {
  it('should respond with a json object', (done) => {
    server
      .get('/api')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        if (err) return done(err);
        done();
      });
  });
});

describe('Catch invalid routes', () => {
  it.skip('return a 404 if route not found', (done) => {
    server
      .get('/api/smoke')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Page does not exist');
        if (err) return done(err);
        done();
      });
  });
});

describe('User Registration', () => {
  it('allows a new user to register', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testValidUsers[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Account created');
        if (err) return done(err);
        done();
      });
  });
  it('allows a new user to register', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testValidUsers[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Account created');
        if (err) return done(err);
        done();
      });
  });

  it('disallow username length less than three characters', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testValidUsers[3])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('fail');
        // expect(res.body.message).to.equal('Username must be minimum 3 and maximum 20');
        if (err) return done(err);
        done();
      });
  });
  it('disallow username length greater than 20 characters', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testValidUsers[6])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('fail');
        // expect(res.body.message).to.equal('Username must be minimum 3 and maximum 20');
        if (err) return done(err);
        done();
      });
  });
  it('disallow password length less than five characters', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testValidUsers[4])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('fail');
        if (err) return done(err);
        done();
      });
  });
  it('Disallow signup if passwords do not mach', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testValidUsers[5])
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Password does not match');
        if (err) return done(err);
        done();
      });
  });
  it('handle validation for empty form fields', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testValidUsers[7])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Please enter a username');
        if (err) return done(err);
        done();
      });
  });
});

describe('User Login', () => {
  it('allows a registered user to signin', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(validUsersLogin[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('You have successfully signed in.');
        if (err) return done(err);
        done();
      });
  });
});

describe('Disallow empty signup form fields', () => {
  it('Check for empty username', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(emptyUsername[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Please enter a username');
        if (err) return done(err);
        done();
      });
  });
  it('Check for empty password', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(emptyPassword[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Please enter a password');
        if (err) return done(err);
        done();
      });
  });
});

describe('Disallow login for unregistered user', () => {
  it('should return Invalid Authentication details', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidUsers[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal(
          'User does not exist'
        );
        if (err) return done(err);
        done();
      });
  });
  it('should return Invalid Authentication details', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidUsers[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal(
          'User does not exist'
        );
        if (err) return done(err);
        done();
      });
  });
});

describe('Registered User Authentication', () => {
  it('should return Invalid Authentication details', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(incorrectPassword[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal(
          'User does not exist'
        );
        if (err) return done(err);
        done();
      });
  });
  it('should return error', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(nullForm[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        if (err) return done(err);
        done();
      });
  });
});

it.skip('return Bad Token', (done) => {
  server
    .get('/api/v1/users/recipes')
    .set('Connection', 'keep alive')
    .set('Content-Type', 'application/json')
    .set('x-access-token', 'yturuueiiwiwjh')
    .end((err, res) => {
      expect(res.statusCode).to.equal(404);
      expect(res.body.message).to.equal('Page does not exist');
      if (err) return done(err);
      done();
    });
});
