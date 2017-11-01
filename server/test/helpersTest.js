import { expect } from 'chai';
import cleanString from '../helpers/cleanString';
import isEmail from '../helpers/isEmail';
import isEmpty from '../helpers/isEmpty';
import isNumber from '../helpers/isNumber';
import isAlphaNum from '../helpers/isAlphaNum';

describe('Test helpers', () => {
  it('cleanString(ab d) should equal abd', () => {
    expect(cleanString('an dela ')).to.equal('andela');
  });
  it('isEmail(rajah@.com) should be false', () => {
    expect(isEmail('rajah@.com')).to.be.equal(false);
  });
  it('isEmail(bob@andela.com) should be true', () => {
    expect(isEmail('bob@andela.com')).to.be.equal(true);
  });
  it('isEmail(bob@gandela) should be false', () => {
    expect(isEmail('bob@andela')).to.be.equal(false);
  });
  it('isEmail(bob.andela.com) should be false', () => {
    expect(isEmail('bob.andela.com')).to.be.equal(false);
  });
  it('isEmpty( ) should be true', () => {
    expect(isEmpty(' ')).to.be.equal(true);
  });
  it('isEmpty(recipe) should be false', () => {
    expect(isEmpty('recipe')).to.be.equal(false);
  });
  it('isNumber(335) should be true', () => {
    expect(isNumber('2')).to.be.equal(true);
  });
  it('isNumber(candy) should be false', () => {
    expect(isNumber('candy')).to.be.equal(false);
  });
  it('isAlphaNum(abc123) should be true', () => {
    expect(isAlphaNum('abc123')).to.be.equal(true);
  });
  it('isAlphaNum(abc%$123) should be false', () => {
    expect(isAlphaNum('abc%$123')).to.be.equal(false);
  });
  
});