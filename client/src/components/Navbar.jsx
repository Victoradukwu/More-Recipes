import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = props => (
  <nav className="navbar sticky-top navbar-expand-md">
    <Link to="/" className="navbar-brand">More-Recipes</Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      ata-target="#navbarNav"
    >
      <span className="fa fa-bars" />
    </button>
    <div className="collapse navbar-collapse container-fluid" id="navbarNav">
      <ul className="navbar-nav">
        { props.isAuthenticated ?
          <li className="nav-item">
            <Link className="nav-link" to="/myRecipes">My Recipes </Link>
          </li>
          : ''
         }
        { props.isAuthenticated ?
          <li className="nav-item">
            <Link className="nav-link" to="/favorites">Favourites</Link>
          </li>
          : ''
         }
        { props.isAuthenticated ?
          <li className="nav-item">
            <Link to="/recipe" className="nav-link" >Add Recipe</Link>
          </li>
          : ''
         }
      </ul>
      { props.isAuthenticated ?
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
          />
          <button className="btn search" type="submit">Search</button>
        </form>
        : ''
       }
       &nbsp;
      <ul className="nav navbar-nav auth">
        { props.isAuthenticated ?
          <li id="signout">
            <Link to="/signout">
                Sign out
            </Link>
          </li>
          : (
            <li id="signin">
              <Link to="/signin">
                <span className="fa fa-sign-in fa-lg" />
                  Sign in
              </Link>
            </li>)
         }
      </ul>
    </div>
  </nav>
);

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
  isAuthenticated: state.userAuthentication.isAuthenticated,
});


export default connect(mapStateToProps, null)(Navbar);

