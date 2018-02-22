import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProType from 'prop-types';

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
        { props.authToken !== null ?
          <li className="nav-item">
            <Link className="nav-link" to="/myRecipes">My Recipes </Link>
          </li>
          : ''
         }
        { props.authToken !== null ?
          <li className="nav-item">
            <a className="nav-link" href="#">Favourites</a>
          </li>
          : ''
         }
        { props.authToken !== null ?
          <li className="nav-item">
            <Link to="/recipe" className="nav-link" >Add Recipe</Link>
          </li>
          : ''
         }
      </ul>
      { props.authToken !== null ?
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
        { props.authToken !== null ?
          <li id="signout">
            <Link to="/signout">
                Sign out
            </Link>
          </li>
          : (
            <li id="signup">
              <Link to="/signup">
                <span className="fa fa-sign-in fa-lg" />
                  Sign up
              </Link>
            </li>)
         }
      </ul>
    </div>
  </nav>
);

Navbar.propTypes = {
  authToken: ProType.any.isRequired
};

const mapStateToProps = state => ({
  authToken: state.authToken
});


export default connect(mapStateToProps, null)(Navbar);

