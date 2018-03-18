import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-md-spinner';
import PropTypes from 'prop-types';

import Recipe from './Recipe';

class RecipeSearchPage extends Component {
  render() {
    let display;
    if (this.props.searchError.length > 0) {
      display = this.props.searchError;
    } else {
      display = this.props.searchedRecipes.map(recipe =>
        (<Recipe
          key={recipe.id}
          recipe={recipe}
        />));
    }
    return (
      <div style={{ padding: '0', margin: '0' }} >

        <h4>
          <small>Search result</small>
        </h4>
        <hr />
        <div className="container">
          <div className="container bg-3 text-center main-content">
            {this.props.isSearching
            ?
              <Spinner size="40" />
            :
              <div className="grid-holder">
                { display }
              </div>
            }
          </div>
          <br /><br />
          <br /><br />
        </div>
      </div>
    );
  }
}
RecipeSearchPage.propTypes = {
  isSearching: PropTypes.bool.isRequired,
  searchedRecipes: PropTypes.array,
  searchError: PropTypes.string
};
RecipeSearchPage.defaultProps = {
  searchedRecipes: [],
  searchError: ''
};

const mapStateToProps = state => ({
  isSearching: state.searchRecipes.isSearching,
  searchedRecipes: state.searchRecipes.searchedRecipes,
  searchError: state.searchRecipes.searchRecipesFailure,
});

export default connect(mapStateToProps, null)(RecipeSearchPage);
