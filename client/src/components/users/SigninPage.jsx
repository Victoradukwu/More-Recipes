import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { siginUser } from '../../actions/userAction';
import validateFields from '../../helpers/validateFields';


class SigninPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error.status) {
      this.setState({ errors: nextProps.error });
    } else {
      this.props.history.push('/dashboard');
    }
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    const userObject = {
      username: this.state.username,
      password: this.state.password,
    };
    if (validateFields(userObject)) {
      this.props.signinUser(userObject);
    } else {
      this.setState({ errors: { status: true, error: { message: 'Please fill in all required fields and submit again' } } });
    }
  }
  render() {
    return (
      <div>
        <br /><br />
        <div className="container main">
          <div className="main-login main-center" >
            <h3>Sign in to continue</h3>
            <form className="form-horizontal" onSubmit={this.onSubmit}>

              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user-circle fa-lg" aria-hidden="true" /></span>
                  <input onChange={this.onChange} type="text" className="form-control" name="username" id="username" placeholder="Enter your Username" />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true" /></span>
                  <input onChange={this.onChange} type="password" className="form-control" name="password" id="password" placeholder="Enter your Password" />
                </div>
              </div>

              <div className="form-group ">
                <button type="submit" className="btn btn-lg btn-block search">Sign in</button>
              </div>
              {this.state.errors.status && <p style={{ color: 'red' }}>{this.state.errors.error.message}</p>}
              <hr />
              <p className="text-center">If you are new,
                <Link to="/signup" >Sign up</Link>, or
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
SigninPage.prototypes = {
  signinUser: PropTypes.func.isRequired,
  history: PropTypes.any.isRequired,
  error: PropTypes.any.isRequired

};

const mapStateToProps = state => ({
  loading: state.authenticatingUser,
  error: state.authenticationFailed,
  success: state.authenticationSuccess
});

const mapDispatchToProps = dispatch => ({
  signinUser: credentials => dispatch(siginUser(credentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
