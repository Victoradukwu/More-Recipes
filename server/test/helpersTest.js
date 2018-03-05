import { expect } from 'chai';
import cleanString from '../utilities/cleanString';
import isEmpty from '../utilities/isEmpty';
import isNumber from '../utilities/isNumber';
import isAlphaNum from '../utilities/isAlphaNum';


describe('Test utility functions', () => {
  describe('Test cleanstring function', () => {
    it('return string with white spaces removed', () => {
      expect(cleanString('an dela ')).to.equal('andela');
    });
  });
  describe('isEmpty helper function', () => {
    it('returns true if a string is empty', () => {
      expect(isEmpty(' ')).to.be.equal(true);
    });
    it('returns false if a string is not empty', () => {
      expect(isEmpty('recipe')).to.be.equal(false);
    });
  });
  describe('isNumber helper function', () => {
    it('returns true if input is a number', () => {
      expect(isNumber('335')).to.be.equal(true);
    });
    it('returns false if input is not a number', () => {
      expect(isNumber('recipe')).to.be.equal(false);
    });
  });

  describe('isAlphaNum helper function', () => {
    it('returns true if unput contains only letters and numbers', () => {
      expect(isAlphaNum('andela235')).to.be.equal(true);
    });
    it('returns false if input contains any character other than letters' +
      ' and numbers', () => {
      expect(isAlphaNum('andel$@123')).to.be.equal(false);
    });
  });
});
