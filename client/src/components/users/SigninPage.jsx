import React, { Component } from 'react';
import { connect } from 'react-redux';

class SigninPage extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log(this.props); 
    return (
      <div className="container main">			
				<div className="main-login main-center" >
					<h3>Sign in to continue</h3>
					<form className="form-horizontal" method="post" action="#">

						<div className="form-group">
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="username" id="username"  placeholder="Enter your Username"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" className="form-control" name="password" id="password"  placeholder="Enter your Password"/>
								</div>
							</div>
						</div>
						<p className="text-right"><a href="">Forgot Password</a></p>

						<div className="form-group ">
							<button type="button" className="btn btn-lg btn-block search">Sign in</button>
						</div>
						<hr/>>
              <p className="text-center">If you are new,
                  <a href="#" className="fliper-btn">Sign up</a>, or
              </p>
						<div style = {{ textAlign: 'center' }}>
						<p>Sign in with</p>
						<i className="fa fa-facebook-official fa-lg"></i>
          </div>
					</form>
				</div>
			</div>      
    );
  }
}

export default SigninPage;