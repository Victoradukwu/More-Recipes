import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import sinon from 'sinon';
import {
  SignupPage,
  mapDispatchToProps
} from '../../components/users/SignupPage';

const props = {
  error: 'theError',
  history: {
    push: jest.fn()
  },
  authenticateUser: jest.fn(),
  userId: 1,
  isCreating: true
};

describe('SignupPage', () => {
  describe('Page display', () => {
    it('display element and matches snapshot', () => {
      const wrapper = shallow(<SignupPage {...props} />);
      expect(wrapper.find('form').exists()).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('Form validation and registration ', () => {
    it('it should render error for empty name in form submission', () => {
      const wrapper = shallow(<SignupPage {...props} />);
      wrapper.instance().setState({
        userName: 'title',
        name: '',
        email: 'instructions@recipe.com',
        password: 'abc123',
        confirmPassword: 'abc123'
      });
      wrapper.update();
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      });
      expect(wrapper.state('errors').name)
        .toBe('Please enter a name for the user');
    });

    it('it should render error for empty userName in form submission', () => {
      const wrapper = shallow(<SignupPage {...props} />);
      wrapper.instance().setState({
        userName: '',
        name: 'theName',
        email: 'instructions@recipe.com',
        password: 'abc123',
        confirmPassword: 'abc123'
      });
      wrapper.update();
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      });
      expect(wrapper.state('errors').username).toBe('Please enter user name');
    });

    it('it should render error for empty email in form submission', () => {
      const wrapper = shallow(<SignupPage {...props} />);
      wrapper.instance().setState({
        userName: 'title',
        name: 'myname',
        email: '',
        password: 'abc123',
        confirmPassword: 'abc123'
      });
      wrapper.update();
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      });
      expect(wrapper.state('errors').email)
        .toBe('Please enter user email');
    });

    it('it should render error for empty password in form submission', () => {
      const wrapper = shallow(<SignupPage {...props} />);
      wrapper.instance().setState({
        userName: 'title',
        name: 'name',
        email: 'instructions@recipe.com',
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
      const wrapper = shallow(<SignupPage {...props} />);
      wrapper.find('input').at(0).simulate('change', {
        target: { name, value },
        preventDefault: () => {}
      });
      expect(wrapper.state('name')).toBe(value);
    });

    it('should create user for valid form input', () => {
      const response = {
        url: 'image_url'
      };

      moxios.stubRequest(
        'https://api.cloudinary.com/v1_1/dsj9ygnq2/upload',
        {
          status: 200,
          response
        }
      );
      const spy = sinon.spy(SignupPage.prototype, 'onSubmit');
      const wrapper = shallow(<SignupPage {...props} />);
      wrapper.instance().setState({
        username: 'nameText',
        name: 'jagua',
        email: 'hala@hala.xyz',
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
      expect(spy.called).toBeTruthy();
      expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    });

    it('handle image change', () => {
      const event = {
        persist: jest.fn(),
        target: {
          name: 'title',
          value: 'new recipe',
          files: [{}]
        }
      };
      const wrapper = shallow(<SignupPage {...props} />);
      wrapper.find('#profilePicture').simulate('change', event);

      expect(wrapper.instance().state.imageFile).toEqual({});
    });
  });

  describe('container functions', () => {
    it('mapDispatchToProps', () => {
      const dispatch = jest.fn();
      expect(mapDispatchToProps(dispatch)).toHaveProperty('authenticateUser');
      expect(mapDispatchToProps(dispatch)).toBeInstanceOf(Object);

      const { authenticateUser } = mapDispatchToProps(dispatch);
      authenticateUser();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
