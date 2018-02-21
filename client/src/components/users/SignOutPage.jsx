import React from 'react';
import PropTypes from 'prop-types';

const SignoutPage = (props) => {
  localStorage.removeItem('token');
  props.history.push('/signin');
  return <div />;
};

SignoutPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,

};

export default SignoutPage;
