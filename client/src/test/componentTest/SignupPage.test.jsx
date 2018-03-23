import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import sinon from 'sinon';
import { SignupPage } from '../../components/users/SignupPage';

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
  it('matches snapshot', () => {
    const wrapper = shallow(<SignupPage {...props} />);
    expect(wrapper.find('form').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

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
    expect(wrapper.state('errors').name.length).toBeGreaterThan(0);
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
    expect(wrapper.state('errors').username.length).toBeGreaterThan(0);
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
    expect(wrapper.state('errors').email.length).toBeGreaterThan(0);
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
    expect(wrapper.state('errors').password.length).toBeGreaterThan(0);
  });

  it('it should render error for empty confirmPassword in form submission', () => {
    const wrapper = shallow(<SignupPage {...props} />);
    wrapper.instance().setState({
      userName: 'title',
      name: 'name',
      email: 'instructions@recipe.com',
      password: 'abc123',
      confirmPassword: ''
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('errors').confirmPassword.length).toBeGreaterThan(0);
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
    expect(spy.called).toBeTruthy();
  });
});
