import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import searchRecipes from '../actions/searchRecipesAction';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch() {
    const { searchTerm } = this.state;
    if (searchTerm && searchTerm.trim().length > 3) {
      this.props.searchRecipes(searchTerm);
      this.context.router.history.push('/recipeSearch');
    }
  }

  render() {
    return (
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
        <div
          className="collapse navbar-collapse container-fluid"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            { this.props.isAuthenticated ?
              <li className="nav-item">
                <Link className="nav-link" to="/myRecipes">My Recipes </Link>
              </li>
          : ''
         }
            { this.props.isAuthenticated ?
              <li className="nav-item">
                <Link className="nav-link" to="/favorites">Favourites</Link>
              </li>
          : ''
         }
            { this.props.isAuthenticated ?
              <li className="nav-item">
                <Link to="/recipe" className="nav-link" >Add Recipe</Link>
              </li>
          : ''
         }
          </ul>
          { this.props.isAuthenticated ?
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                onChange={(event) => {
                  this.setState({ searchTerm: event.target.value });
                }}
              />
              <button
                className="btn search"
                onClick={(event) => {
                  event.preventDefault();
                  this.onSearch();
                }}
              >Search
              </button>
            </form>
        : ''
       }
       &nbsp;
          <ul className="nav navbar-nav auth">
            { this.props.isAuthenticated ?
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
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  searchRecipes: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  isAuthenticated: state.userAuthentication.isAuthenticated,
});

Navbar.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { searchRecipes })(Navbar);

