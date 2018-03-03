import 'chai';
import 'mocha';
import supertest from 'supertest';
import app from '../www';
import users from '../seeders/userSeeder';
import dbSync from '../utilities/clearDb';

const {
  testValidUsers, validUsersLogin, invalidUsers,
  emptyPassword, incorrectPassword
} = users;


const { clearDb } = dbSync;
const server = supertest.agent(app);
const { expect } = require('chai');

// recreate the db tables
clearDb();
// two users created for subsequently testing recipe associated actions
describe('Test Server Connection', () => {
  it('should allow connection and respond with a json object', (done) => {
    server
      .get('/api')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Status connected ok');
        expect(res.body.status).to.equal('success');
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

  it('Ensures that username is a minimum of 3 characters', (done) => {
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
        expect(res.body.message).to.equal('Username should be at least ' +
        'three characters');
        if (err) return done(err);
        done();
      });
  });
  it('Ensures that username is provided for registration', (done) => {
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
        expect(res.body.message).to.equal('Please enter a name for the user');
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
        expect(res.body.message).to.equal('minimum length of ' +
        'the password is 5');
        if (err) return done(err);
        done();
      });
  });
  it('Prevent sign in if there is no password', (done) => {
    server
      .post('/api/v1/users/signin')
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
});

describe('User Login', () => {
  it('A registered user can signin', (done) => {
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
        expect(res.body.message).to.equal('User does not exist');
        if (err) return done(err);
        done();
      });
  });
  it('should disallow Invalid Authentication details', (done) => {
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
        expect(res.body.message).to.equal('Invalid Username or password');
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
        expect(res.body.message).to.equal('User does not exist');
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
      .send()
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        if (err) return done(err);
        done();
      });
  });
});
