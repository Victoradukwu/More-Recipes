import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as recipeActions from '../../actions/recipeActions';
import RecipeForm from './RecipeForm';
import validate from '../../helpers/validate';


/**
 * @description
 * @class ManageRecipePage
 * @extends {Component}
 */
class ManageRecipePage extends Component {
  /**
   * Creates an instance of ManageRecipePage.
   * @param {any} props
   * @memberof ManageRecipePage
   */
  constructor(props) {
    super(props);
    this.state = {
      // 'this' keyword not required for props, since it is in the constructor
      recipe: Object.assign({}, props.recipe),
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error.status) {
      this.setState({ errors: nextProps.error });
    }
    if (this.props.recipe.id !== nextProps.recipe.id) {
      this.setState({ recipe: Object.assign({}, nextProps.recipe) });
    }
  }
  // update recipe state, each time an inpute field changes
  onChange(event) {
    const field = event.target.name;
    const myRecipe = Object.assign({}, this.state.recipe);
    myRecipe[field] = event.target.value;
    return this.setState({ recipe: myRecipe });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    const recipeObject = {
      recipeName: event.target.recipeName.value,
      category: event.target.category.value,
      ingredients: event.target.ingredients.value,
      instructions: event.target.instructions.value,
      id: this.state.recipe.id
    };
    const { isValid, errors } = validate(recipeObject);
    if (isValid) {
      this.setState({ errors: {} });
      this.props.actions.submitRecipe(recipeObject)
        .then(() => {
          this.props.history.push('/myRecipes');
        });
    }

    this.setState({ errors });
  }

  isSignedIn() {
    if (localStorage.token === undefined) {
      this.props.history.push('/signin');
    }
  }
  render() {
    this.isSignedIn();
    return (
      <div className="row">
        <div className="col-sm-3" />
        <div className="col-sm-6">
          <h3> Add/Edit Recipe</h3>
          <RecipeForm
            recipe={this.state.recipe}
            errors={this.state.errors}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
          />
        </div>
        <div className="col-sm-3" />
      </div>
    );
  }
}
ManageRecipePage.propTypes = {
  error: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  actions: PropTypes.object.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.number,
    recipeName: PropTypes.string,
    category: PropTypes.string,
    ingredients: PropTypes.string,
    instructions: PropTypes.string,
    upvote: PropTypes.number,
    downvote: PropTypes.number,
    views: PropTypes.number,
    favorites: PropTypes.number,
    createdAt: PropTypes.any,
    updatedAt: PropTypes.any,
    userId: PropTypes.number,
    reviews: PropTypes.array,
    User: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
  }).isRequired,
};
ManageRecipePage.defaultProps = {
  error: {}
};
const getRecipeById = (recipes, id) => {
  const singleRecipe = recipes.filter(recipe =>
    parseInt(recipe.id, 10) === parseInt(id, 10));
  if (singleRecipe.length > 0) {
    return singleRecipe[0];
  }
  return 'Recipe Not Found';
};
const mapStateToProps = (state, ownProps) => {
  const recipeId = ownProps.match.params.id;
  let recipe = { recipeName: '', instructions: '', category: '' };
  if (recipeId && state.userRecipes.length > 0) {
    recipe = getRecipeById(state.userRecipes, recipeId);
  }
  return { recipe };
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(recipeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageRecipePage);
