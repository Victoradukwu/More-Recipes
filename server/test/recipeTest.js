import 'chai';
import 'mocha';
import supertest from 'supertest';
import app from '../../app';
import dbSync from '../helpers/clearDb';
import recipes from '../Seeders/recipeSeeders';

const validRecipe = recipes.validRecipe;

const expect = require('chai').expect,
  userData = [],
  clearDb = dbSync.clearDb,
  server = supertest.agent(app);

clearDb();

describe('Creating recipe without signin in', () => {
  it('should respond with a json object', (done) => {
    server
      .post('/api/v1/recipes')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .send(validRecipe)
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(403);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('No Token provided');
        if (err) return done(err);
        done();
      });
  });
});
