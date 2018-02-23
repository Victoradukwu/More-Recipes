import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../../actions/userAction';

const SignoutPage = (props) => {
  localStorage.removeItem('token');
  props.logout();
  props.history.push('/signin');
  return <div />;
};

SignoutPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,

};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logout }, dispatch);


export default connect(null, mapDispatchToProps)(SignoutPage);
