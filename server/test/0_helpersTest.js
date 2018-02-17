import { expect } from 'chai';
import cleanString from '../utilities/cleanString';
import isEmpty from '../utilities/isEmpty';
import isNumber from '../utilities/isNumber';
import isAlphaNum from '../utilities/isAlphaNum';

describe('Test helpers', () => {
  it('cleanString(ab d) should equal abd', () => {
    expect(cleanString('an dela ')).to.equal('andela');
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
