import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserRecipes } from '../../actions/recipeActions';
import RecipeList from './RecipeList';

class UserRecipesPage extends Component {
  componentDidMount() {
    this.props.fetchUserRecipes();
  }
  render() {
    return (
      <div>
        <br /><br />
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <h3>Your Recipes</h3>
            <p>Click on a recipe name to edit</p>
            {
              this.props.userRecipes &&
              <RecipeList userRecipes={this.props.userRecipes} />
            }
          </div>
          <div className="col-sm-2" />
        </div>
        <br /><br />

      </div>
    );
  }
}

UserRecipesPage.propTypes = {
  fetchUserRecipes: PropTypes.func.isRequired,
  userRecipes: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  userRecipes: state.userRecipes
});

export default connect(mapStateToProps, { fetchUserRecipes })(UserRecipesPage);
