import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from 'react-md-spinner';
import { authenticateUser } from '../../actions/userAction';
import { signInValidation } from '../../helpers/validateFields';


class SigninPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ errors: { authError: nextProps.error } });
    }
    if (nextProps.userId !== 0) {
      this.props.history.push('');
    }
  }

  /**
   * @description handles the change event of the signin form fields
   *
   * @param {any} event
   *
   * @memberof SigninPage
   * @returns {any} null
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description handles the submit event of the user signin form
   *
   * @param {any} event
   *
   * @memberof SigninPage
   * @returns {any} null
   */
  onSubmit(event) {
    event.preventDefault();
    const {
      username, password
    } = this.state;
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.authenticateUser({ username, password }, 'signin');
    }
  }
  /**
   * @description handles client validation checks
   * @method isValid
   *
   * @returns { bool } true/false when form is submitted
   */
  isValid() {
    const { errors, isValid } = signInValidation(this.state);
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
      errors: { ...this.state.errors, [event.target.name]: '' }
      // errors: Object.assign({}, this.state.errors, { [event.target.name]: '' })
    });
  }

  render() {
    const { username, password, authError } = this.state.errors;
    return (
      <div>
        <br /><br />
        <div className="container main">
          <div className="main-login main-center col-sm-6" >
            <h3>Sign in to continue</h3>
            {authError &&
              <div className="alert alert-danger">
                {authError}
              </div>
            }
            <form
              className="form-horizontal"
              autoComplete="nope"
              onSubmit={this.onSubmit}
            >

              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="authIcon fa fa-user-circle fa-lg" />
                  </span>
                  <input
                    onChange={this.onChange}
                    onFocus={this.handleOnFocus}
                    type="text"
                    value={this.state.username}
                    className="form-control"
                    name="username"
                    id="username"
                    placeholder="Enter your Username"
                  />
                </div>
                {username && <small style={{ color: 'red' }}>{username}</small>}
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="authIcon fa fa-lock fa-lg" />
                  </span>
                  <input
                    onChange={this.onChange}
                    onFocus={this.handleOnFocus}
                    value={this.state.password}
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Enter your Password"
                  />
                </div>
                {password && <small style={{ color: 'red' }}>{password}</small>}
              </div>

              <div className="form-group ">
                <button
                  type="submit"
                  className="btn btn-lg btn-block search"
                  disabled={this.props.isLogging}
                >
                  {!this.props.isLogging
                  ?
                  'Sign In'
                  :
                  <Spinner size={20} />
                }
                </button>
              </div>
              {this.state.errors.status &&
              <p style={{ color: 'red' }}>{this.state.errors.error.message}</p>}
              <hr />
              <p className="text-center">If you are new,
                <Link to="/signup" > Sign up here.</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
SigninPage.propTypes = {
  error: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  authenticateUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  isLogging: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  userId: state.userAuthentication.authId,
  error: state.userAuthentication.AuthError,
  isLogging: state.userAuthentication.isAuthenticating
});

const mapDispatchToProps = dispatch => ({
  authenticateUser: (userDetails, path) =>
    dispatch(authenticateUser(userDetails, path))
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
