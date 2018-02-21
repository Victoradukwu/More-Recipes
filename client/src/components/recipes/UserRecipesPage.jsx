import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserRecipes, deleteRecipe } from '../../actions/recipeActions';
import RecipeList from './RecipeList';

class UserRecipesPage extends Component {
  constructor(props) {
    super(props);
    this.redirectToCreateRecipePage = this.redirectToCreateRecipePage.bind(this);
    this.isSignedIn = this.isSignedIn.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }
  componentDidMount() {
    this.props.fetchUserRecipes();
  }
  redirectToCreateRecipePage() {
    this.props.history.push('/recipe');
  }

  isSignedIn() {
    if (localStorage.token === undefined) {
      this.props.history.push('/signin');
    }
  }
  deleteRecipe(event) {
    event.preventDefault();
    this.props.actions.deleteRecipe(id);
  }
  render() {
    this.isSignedIn();
    return (
      <div>
        <br /><br />
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <h3>Your Recipes</h3>
            <p style={{ display: 'inline-block', float: 'left' }}>Click on a recipe name to edit</p>
            <button
              className="btn btn-success btn-lg"
              style={{ display: 'inline-block', float: 'right' }}
              onClick={this.redirectToCreateRecipePage}
            >
                Create a recipe
            </button>
            {
              this.props.userRecipes &&
              <RecipeList
                userRecipes={this.props.userRecipes}
                deleteRecipe ={this.props.deleteRecipe}
              />
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
  userRecipes: PropTypes.array.isRequired,
  history: PropTypes.any.isRequired,
  deleteRecipe: PropTypes.func
};

const mapStateToProps = state => ({
  userRecipes: state.userRecipes
});

export default connect(mapStateToProps, { fetchUserRecipes, deleteRecipe })(UserRecipesPage);
