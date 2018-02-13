import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as recipeActions from '../../actions/recipeActions';
// import validateFields from '../../helpers/validateFields';
import RecipeForm from './RecipeForm';


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
      // 'this' keyword is not required for props, since it is in the constructor
      recipe: Object.assign({}, props.recipe),
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error.status) {
      this.setState({ errors: nextProps.error });
    } else if (typeof nextProps.user.id === 'number') {
      this.props.history.push('/dashboard');
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
      instructions: event.target.instruction.value,
    };
    this.props.actions.submitRecipe(recipeObject);
    // this.context.router.push('/myRecipes');
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-3" />
        <div className="col-sm-6">
          <h1>Manage Recipe</h1>
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
ManageRecipePage.contextTypes = {
  router: PropTypes.object
};
ManageRecipePage.propTypes = {
  error: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.any,
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
  error: {},
  user: {},
  history: {}
};

const mapStateToProps = (state) => {
  const recipe = { recipeName: '', instruction: '', category: '' };
  return { recipe };
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(recipeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageRecipePage);
