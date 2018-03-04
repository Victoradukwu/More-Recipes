import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from 'react-md-spinner';
import { authenticateUser } from '../../actions/userAction';
import { signUpValidation } from '../../helpers/validateFields';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ errors: nextProps.error });
    }
    if (nextProps.userId !== 0) {
      this.props.history.push('/');
    }
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    const {
      name, username, email, password, confirmPassword
    } = this.state;
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.authenticateUser({
        name, username, email, password, confirmPassword
      }, 'signup');
    }
  }

  /**
   * @description handles client validation checks
   * @method isValid
   *
   * @returns { bool } true/false when form is submitted
   */
  isValid() {
    const { errors, isValid } = signUpValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * @description handles on focus event
   * @method handleOnFocus
   *
   * @param { object } event - event object containing sign up details
   *
   * @returns { object } new sign up details state
   */
  handleOnFocus(event) {
    this.setState({
      errors: Object.assign({}, this.state.errors, { [event.target.name]: '' })
    });
  }


  render() {
    const {
      name, email, username, password, confirmPassword
    } = this.state.errors;
    return (
      <div className="container main login-screen">
        <br /><br />

        <div className="main-login main-center" >
          <h3>Register to continue</h3>
          <form className="form-horizontal" onSubmit={this.onSubmit}>


            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="authIcon fa fa-user fa" aria-hidden="true" />
                  </span>
                  <input
                    onChange={this.onChange}
                    onFocus={this.handleOnFocus}
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    name="name"
                    id="name"
                    placeholder="Enter your Name"
                  />
                </div>
              </div>
              {name && <small style={{ color: 'red' }} >{name}</small>}
            </div>

            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="authIcon fa fa-envelope fa" />
                  </span>
                  <input
                    onChange={this.onChange}
                    onFocus={this.handleOnFocus}
                    type="text"
                    className="form-control"
                    value={this.state.email}
                    name="email"
                    id="email"
                    placeholder="Enter your Email"
                  />
                </div>
              </div>
              {email && <small style={{ color: 'red' }} >{email}</small>}
            </div>

            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="authIcon fa fa-user-circle fa-lg" />
                  </span>
                  <input
                    onChange={this.onChange}
                    onFocus={this.handleOnFocus}
                    type="text"
                    className="form-control"
                    value={this.state.username}
                    name="username"
                    id="username"
                    placeholder="Enter your Username"
                  />
                </div>
              </div>
              {username && <small style={{ color: 'red' }} >{username}</small>}
            </div>

            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="authIcon fa fa-lock fa-lg" />
                  </span>
                  <input
                    onChange={this.onChange}
                    onFocus={this.handleOnFocus}
                    type="password"
                    className="form-control"
                    value={this.state.password}
                    name="password"
                    id="password"
                    placeholder="Enter your Password"
                  />
                </div>
              </div>
              {password && <small style={{ color: 'red' }} >{password}</small>}
            </div>

            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="authIcon fa fa-lock fa-lg" />
                  </span>
                  <input
                    onChange={this.onChange}
                    onFocus={this.handleOnFocus}
                    type="password"
                    className="form-control"
                    value={this.state.confirmPassword}
                    name="confirmPassword"
                    id="confirm"
                    placeholder="Confirm your Password"
                  />
                </div>
              </div>
              {confirmPassword &&
                <small style={{ color: 'red' }} >
                  {confirmPassword}
                </small>
              }
            </div>

            <div className="form-group ">
              <button
                type="submit"
                className="btn btn-lg btn-block search"
                disabled={this.props.isCreating}
              >
                {!this.props.isCreating
                  ?
                  'Register'
                  :
                  <span>Registering <Spinner size={20} /></span>
                }
              </button>
            </div>
            {this.state.errors.status &&
            <p style={{ color: 'red' }}>
              {this.state.errors.error.message}
            </p>}
            <p>
              Already registered, please <Link to="/signin">Login.</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  error: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  authenticateUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  isCreating: PropTypes.bool.isRequired
};
SignupPage.defaultProps = {
  error: {}
};

const mapStateToProps = state => ({
  userId: state.userAuthentication.authId,
  error: state.userAuthentication.signupError,
  isCreating: state.userAuthentication.isAuthenticating
});

const mapDispatchToProps = dispatch => ({
  authenticateUser: (userDetails, path) =>
    dispatch(authenticateUser(userDetails, path))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
