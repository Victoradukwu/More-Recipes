import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/userAction'
import { prototypes } from 'react';

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
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.signup = this.signup.bind(this);
  }

  onChange(event) {
    const { name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error.status) {
      console.log(nextProps.error)
    }
  }
  signup() {
    console.log(this.state);
  }

  onSubmit(event) {
    this.setState({errors: {}});
    event.preventDefault();
    this.props.createUser(this.state)
  }

  render() {
    console.log(this.props)
    return (
      <div className="container main login-screen">

        <div className="main-login main-center" >
          <h3>Register to continue</h3>
          <form className="form-horizontal" onSubmit={this.onSubmit}>


            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                  <input onChange={this.onChange} type="text" className="form-control" value = {this.state.name}  name="name" id="name" placeholder="Enter your Name" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                  <input onChange={this.onChange} type="text" className="form-control" value = {this.state.email}  name="email" id="email" placeholder="Enter your Email" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
                  <input onChange={this.onChange} type="text" className="form-control" value = {this.state.username} name="username" id="username" placeholder="Enter your Username" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                  <input onChange={this.onChange} type="password" className="form-control" value = {this.state.password}  name="password" id="password" placeholder="Enter your Password" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                  <input onChange={this.onChange} type="password" className="form-control" value = {this.state.confirmPassword}  name="confirmPassword" id="confirm" placeholder="Confirm your Password" />
                </div>
              </div>
            </div>

            <div className="form-group ">
              <button type="submit" className="btn btn-lg btn-block search" onClick = {this.signup} >Register</button>
            </div>
            <p>
              Already registered, please <a href="index.login.html">Login.</a>
            </p>
          </form>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    error: state.creatingUserHasErrored
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
      createUser: userDetails => dispatch(createUser(userDetails))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);