import React, { Component } from 'react';
import { Link, Route , Switch} from 'react-router-dom';

import AboutPage from './recipes/AboutPage';
import HomePage from './recipes/HomePage';
import SignUpPage from './users/SignupPage';
import NotFoundPage from './NotFoundPage';

const LayoutPage = () => (
  <div className = 'primary-layout'>
  <nav className="navbar sticky-top navbar-expand-md">
        <Link to = "/" className="navbar-brand">More-Recipes</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse container-fluid" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">My Recipes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Favourites</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Add Recipe</a>
            </li>      
        </ul>
          <form className="form-inline" action="">
            <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
            <button className="btn search" type="submit">Search</button>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="signup.html">
                <span className="fa fa-sign-in fa-lg">
                </span>
                Sign in
              </a>
            </li>
          </ul>      
      </div>
    </nav>   

    <main>
      <Switch>
      <Route path = "/" exact component = { HomePage } />
      <Route path = "/about" component = { AboutPage } />
      <Route path = "/signup" component = { SignUpPage } />
      <Route path = "*" component = { NotFoundPage } />
      </Switch>
    </main>
    <footer className="fixed-bottom">
      <div style ={{display: "inline-block", float: "left"}}>
        <h6>Connect with us:</h6>
        <span className=" social fa fa-facebook"></span>
        <span className=" social fa fa-google-plus"></span>
        <span className=" social fa fa-instagram"></span>
      </div>
      <p style = {{dislay: "inline-block", float: "none"}}>&copy; More-Recipes 2018</p>
      <div style = {{display: "inline-block", float:"right", paddingRight: "40px"}}>
        <h6>Contact us:</h6>
        <span className="fa fa-envelope">: vicads01@gmail.com</span> &nbsp;
        <span className="fa fa-phone">: +2348037544687</span>
      </div>
    </footer>
    </div>
  );


export default LayoutPage;