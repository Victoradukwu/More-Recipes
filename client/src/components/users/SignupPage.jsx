import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import { createUser } from '../../actions/userAction';
import validateFields from '../../helpers/validateFields';

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
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentWillReceiveProps(nextProps) {

    if (nextProps.error.status) {
      this.setState({ errors: nextProps.error });
    } else if (typeof nextProps.user.id === 'number') {
      this.props.history.push('/dashboard');
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
    this.setState({ errors: {} });
    const userObject = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    if (validateFields(userObject)) {
      this.props.createUser(userObject);
    } else {
      this.setState({ errors: { status: true, error: { message: 'Please fill in all required fields and submit again' } } });
    }
  }


  render() {
    return (
      <div className="container main login-screen">
        <br/><br/>

        <div className="main-login main-center" >
          <h3>Register to continue</h3>
          <form className="form-horizontal" onSubmit={this.onSubmit}>


            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true" /></span>
                  <input onChange={this.onChange} type="text" className="form-control" value={this.state.name} name="name" id="name" placeholder="Enter your Name" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true" /></span>
                  <input onChange={this.onChange} type="text" className="form-control" value={this.state.email} name="email" id="email" placeholder="Enter your Email" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user-circle fa-lg" aria-hidden="true" /></span>
                  <input onChange={this.onChange} type="text" className="form-control" value={this.state.username} name="username" id="username" placeholder="Enter your Username" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true" /></span>
                  <input onChange={this.onChange} type="password" className="form-control" value={this.state.password} name="password" id="password" placeholder="Enter your Password" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true" /></span>
                  <input onChange={this.onChange} type="password" className="form-control" value={this.state.confirmPassword} name="confirmPassword" id="confirm" placeholder="Confirm your Password" />
                </div>
              </div>
            </div>

            <div className="form-group ">
              <button type="submit" className="btn btn-lg btn-block search" onClick={() => toastr.success('The title', 'The message')} >Register</button>
            </div>
            {this.state.errors.status && <p style={{ color: 'red' }}>{this.state.errors.error.message}</p>}
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
  history: PropTypes.object,
  createUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: state.creatingUserHasErrored,
  user: state.createdUser,
  isRegistering: state.creatingUser
});

const mapDispatchToProps = dispatch => ({
  createUser: userDetails => dispatch(createUser(userDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
