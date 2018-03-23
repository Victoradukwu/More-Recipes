import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as recipeActions from '../../actions/recipeActions';
import RecipeForm from './RecipeForm';
import validate from '../../helpers/validate';
import setAuthorizationToken from '../../helpers/setAuthorizationToken';

require('dotenv').config();


export class ManageRecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: { ...this.props.recipe },
      errors: {},
      recipeNameError: '',
      categoryError: '',
      instructionError: '',
      ingredientError: '',
      defaultImgSrc: '../../assets/img/hd8.jpg',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error.status) {
      this.setState({ errors: nextProps.error });
    }
    if (this.props.recipe.id !== nextProps.recipe.id) {
      this.setState({ recipe: { ...nextProps.recipe } });
    }
  }

  /**
   * @description a function that change event on the form input fields
   *
   * @param {any} event
   *
   * @memberof ManageRecipePage
   * @returns {obj} state
   */
  onChange(event) {
    const field = event.target.name;
    const myRecipe = { ...this.state.recipe };
    myRecipe[field] = event.target.value;
    return this.setState({ recipe: myRecipe });
  }

  /**
 * @description A function that handles create/edit form submission
 *
 * @param {any} event
 * @memberof ManageRecipePage
 *
 * @returns {any} void
 */
  async onSubmit(event) {
    event.preventDefault();
    const recipeObject = {
      recipeName: this.state.recipe.recipeName,
      category: this.state.recipe.category,
      ingredients: this.state.recipe.ingredients,
      instructions: this.state.recipe.instructions,
      id: this.state.recipe.id
    };
    if (this.state.recipe.recipePicture) {
      const recipeImage = await this.getImgURL();
      const imageUrl = recipeImage.data.url;
      recipeObject.recipePicture = imageUrl;
    }
    this.setState({ errors: {} });

    setAuthorizationToken(localStorage.getItem('token'));
    const { isValid, errors } = validate(recipeObject);
    if (isValid) {
      this.setState({ errors: {} });
      this.props.actions.submitRecipe(recipeObject)
        .then(() => {
          this.props.history.push('/myRecipes');
        });
    }
    this.setState({
      errors,
      recipeNameError: errors.recipeName,
      instructionError: errors.instructions,
      ingredientError: errors.ingredients,
      categoryError: errors.category
    });
  }


  /**
 * @description function that uploads recipe image to cloudinary and
 * returs the associated url

 * @memberof ManageRecipePage
 * @returns {sting} cloudinary url of the uploaded image
 */
  getImgURL() {
    const imgPix = this.state.recipe.recipePicture;
    delete axios.defaults.headers.common['x-access-token'];
    const imageData = new FormData();
    imageData.append('file', imgPix);
    imageData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
    return axios.post(process.env.CLOUDINARY_URL, imageData);
  }


  /**
   * @description js function that handles image upload event
   *
   * @param {any} event
   *
   * @memberof ManageRecipePage
   * @returns {any} null
   */
  handleImageChange(event) {
    event.persist();
    if (event.target.files.length) {
      const file = event.target.files[0];
      const filereader = new FileReader();
      this.setState({
        recipe:
            { ...this.state.recipe, recipePicture: file }
      });

      filereader.onload = (e) => {
        this.setState({ defaultImgSrc: e.target.result });
      };
      filereader.readAsDataURL(file);
    }
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
            onImageUpload={this.handleImageChange}
            defaultImgSrc={this.state.defaultImgSrc}
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
    createdAt: PropTypes.object,
    updatedAt: PropTypes.object,
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
  let recipe = {
    recipeName: '', instructions: '', ingredients: '', category: ''
  };
  if (recipeId && state.userRecipes.length > 0) {
    recipe = getRecipeById(state.userRecipes, recipeId);
  }
  return { recipe };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(recipeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageRecipePage);
