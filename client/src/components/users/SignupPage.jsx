import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from 'react-md-spinner';
import axios from 'axios';
import { authenticateUser } from '../../actions/userAction';
import { signUpValidation } from '../../helpers/validateFields';
import setAuthorizationToken from '../../helpers/setAuthorizationToken';

require('dotenv').config();

export class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      location: '',
      confirmPassword: '',
      imageFile: null,
      profilePicture: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ errors: { authError: nextProps.error } });
    }
    if (nextProps.userId !== 0) {
      this.props.history.push('/');
    }
  }

  /**
   * @description handles onChange event for the fields of signup form
   *
   * @param {any} event
   *
   * @memberof SignupPage
   * @returns {any} null
   */
  onChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  /**
   * @description handles onSubmit event of us
   *
   * @param {any} event
   *
   * @memberof SignupPage
   * @returns {any} null
   */
  async onSubmit(event) {
    event.preventDefault();
    if (this.state.imageFile) {
      const userImage = await this.getImgURL();
      const imageUrl = userImage.data.url;
      this.setState({ profilePicture: imageUrl });
    }
    this.setState({ errors: {} });

    setAuthorizationToken(localStorage.getItem('token'));

    if (this.isValid()) {
      const {
        name,
        username,
        email,
        profilePicture,
        location,
        password,
        confirmPassword
      } = this.state;
      this.setState({ errors: {} });
      this.props.authenticateUser({
        name,
        username,
        email,
        password,
        location,
        confirmPassword,
        profilePicture
      }, 'signup');
    }
  }

  /**
   * @description fnction that handles user image upload to cloudinary
   *
   * @parameters null
   *
   * @memberof SignupPage
   * @returns {any}null
   */
  getImgURL() {
    const imgPix = this.state.imageFile;
    delete axios.defaults.headers.common['x-access-token'];
    const imageData = new FormData();
    imageData.append('file', imgPix);
    imageData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
    return axios.post(process.env.CLOUDINARY_URL, imageData);
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
   * @description function that handles user image upload during signup
   *
   * @param {any} event
   *
   * @memberof SignupPage
   * @returns {any} null
   */
  handleImageChange(event) {
    event.persist();
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.setState({
        imageFile: file
      });
    }
  }

  render() {
    const {
      name, email, username, password, confirmPassword, authError
    } = this.state.errors;
    return (
      <div className="container main login-screen">
        <br /><br />

        <div className="main-login main-center" >
          <h3>Register to continue</h3>
          { authError &&
          <div className="alert alert-danger">{authError} </div>
            }
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
                    <i className="authIcon fa fa-map-marker fa-lg" />
                  </span>
                  <input
                    onChange={this.onChange}
                    onFocus={this.handleOnFocus}
                    type="text"
                    className="form-control"
                    value={this.state.location}
                    name="location"
                    id="location"
                    placeholder="Enter your location"
                  />
                </div>
              </div>
              {username && <small style={{ color: 'red' }} >{username}</small>}
            </div>

            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="authIcon fa fa-user-circle fa-lg" />
                  </span>
                  <input
                    onChange={this.handleImageChange}
                    error={this.state.errors.profilePicture}
                    type="file"
                    accepts="image/*"
                    className="form-control"
                    name="profilePicture"
                    id="profilePicture"
                    placeholder="Upload your picture"
                  />
                </div>
              </div>
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
                id="registerbutton"
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
  error: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  authenticateUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  isCreating: PropTypes.bool.isRequired
};
SignupPage.defaultProps = {
  error: ''
};

export const mapStateToProps = state => ({
  userId: state.userAuthentication.authId,
  error: state.userAuthentication.authError,
  isCreating: state.userAuthentication.isAuthenticating
});

export const mapDispatchToProps = dispatch => ({
  authenticateUser: (userDetails, path) =>
    dispatch(authenticateUser(userDetails, path))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
