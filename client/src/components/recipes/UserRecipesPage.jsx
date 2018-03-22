import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { fetchUserRecipes, deleteRecipe } from '../../actions/recipeActions';
import RecipeList from './RecipeList';

export class UserRecipesPage extends Component {
  constructor(props) {
    super(props);
    this.redirectToCreateRecipePage =
    this.redirectToCreateRecipePage.bind(this);
    this.isSignedIn = this.isSignedIn.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
  }
  componentDidMount() {
    this.props.fetchUserRecipes();
  }

  /**
   * @description function thatredirects a user to recipe-creation page
   *
   * @parameter null
   *
   * @memberof UserRecipesPage
   * @returns {any} null
   */
  redirectToCreateRecipePage() {
    this.props.history.push('/recipe');
  }

  isSignedIn() {
    if (localStorage.token === undefined) {
      this.props.history.push('/signin');
    }
  }

  /**
   * @description function that hendles recipe-delete option
   *
   * @param {number} id
   *
   * @memberof UserRecipesPage
   * @returns {any} null
   */
  handleDeleteRecipe(id) {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you want to delete this recipe?',
      confirmLabel: 'Yes, delete',
      cancelLabel: 'Do not delete',
      onConfirm: () => this.props.deleteRecipe(id),
      onCancel: () => this.props.history.push('/myRecipes'),
    });
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
            <p style={{ display: 'inline-block', float: 'left' }}>
              Click on a recipe name to edit
            </p>
            <button
              className="btn search btn-lg"
              style={{ display: 'inline-block', float: 'right' }}
              onClick={this.redirectToCreateRecipePage}
            >
                Create a recipe
            </button>
            {
              this.props.userRecipes &&
              <RecipeList
                userRecipes={this.props.userRecipes}
                deleteRecipe={this.handleDeleteRecipe}
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
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  deleteRecipe: PropTypes.func,
};
UserRecipesPage.defaultProps = {
  deleteRecipe: ''
};
const mapStateToProps = ({ userRecipes }) => ({
  userRecipes
});

export default connect(mapStateToProps, {
  fetchUserRecipes,
  deleteRecipe
})(UserRecipesPage);
