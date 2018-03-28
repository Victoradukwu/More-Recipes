import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SigninPage } from '../../components/users/SigninPage';

const props = {
  error: 'theError',
  history: {
    push: jest.fn()
  },
  authenticateUser: jest.fn(),
  userId: 1,
  isCreating: true
};

describe('SigninPage', () => {
  describe('render page element', () => {
    it('matches snapshot', () => {
      const wrapper = shallow(<SigninPage {...props} />);
      expect(wrapper.find('form').exists()).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Form validation and submission', () => {
    it('it should render error for empty userName in form submission', () => {
      const wrapper = shallow(<SigninPage {...props} />);
      wrapper.instance().setState({
        userName: '',
        password: 'abc123',
        confirmPassword: 'abc123'
      });
      wrapper.update();
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      });
      expect(wrapper.state('errors').username).toBe('Please enter a username');
    });

    it('it should render error for empty password in form submission', () => {
      const wrapper = shallow(<SigninPage {...props} />);
      wrapper.instance().setState({
        userName: 'title',
        password: '',
        confirmPassword: 'abc123'
      });
      wrapper.update();
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      });
      expect(wrapper.state('errors').password).toBe('Please enter a password');
    });

    it('should set name state on input change', () => {
      const value = 'Rajah';
      const name = 'name';
      const wrapper = shallow(<SigninPage {...props} />);
      wrapper.find('input').at(0).simulate('change', {
        target: { name, value },
        preventDefault: () => {}
      });
      expect(wrapper.state('name')).toBe(value);
    });

    it('should authenticate user for valid form input', () => {
      const spy = sinon.spy(SigninPage.prototype, 'onSubmit');
      const wrapper = shallow(<SigninPage {...props} />);
      wrapper.instance().setState({
        username: 'nameText',
        password: 'instructions',
        confirmPassword: 'instructions'
      });
      wrapper.update();
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      });
      const componentWillReceivePropsSpy = jest
        .spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.setProps({ userId: 1, error: '' });
      wrapper.setState({ errors: { authError: '' } });
      expect(spy.called).toBeTruthy();
      expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    });
  });
});
