import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import axios from 'axios';
import * as recipeActions from '../../actions/recipeActions';
import RecipeForm from './RecipeForm';
import validate from '../../helpers/validate';
import checkImageFile from '../../helpers/checkImageFile';
import setAuthorizationToken from '../../helpers/setAuthorizationToken';

require('dotenv').config();

/**
 * @description
 * @class ManageRecipePage
 * @extends {Component}
 */
class ManageRecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: Object.assign({}, props.recipe),
      errors: {},
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
      this.setState({ recipe: Object.assign({}, nextProps.recipe) });
    }
  }
  onChange(event) {
    const field = event.target.name;
    const myRecipe = Object.assign({}, this.state.recipe);
    myRecipe[field] = event.target.value;
    return this.setState({ recipe: myRecipe });
  }

  async onSubmit(event) {
    event.preventDefault();
    const recipeObject = {
      recipeName: event.target.recipeName.value,
      category: event.target.category.value,
      ingredients: event.target.ingredients.value,
      instructions: event.target.instructions.value,
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
    this.setState({ errors });
  }

  getImgURL() {
    const imgPix = this.state.recipe.recipePicture;
    delete axios.defaults.headers.common['x-access-token'];
    const imageData = new FormData();
    imageData.append('file', imgPix);
    imageData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
    return axios.post(process.env.CLOUDINARY_URL, imageData);
  }

  handleImageChange(event) {
    event.persist();
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const filereader = new FileReader();
      checkImageFile(filereader, file, (fileType) => {
        if (fileType === 'image/png' || fileType === 'image/gif' ||
          fileType === 'image/jpeg') {
          this.setState({
            recipe:
            Object.assign({}, this.state.recipe, { recipePicture: file })
          });

          filereader.onload = (e) => {
            this.setState({ defaultImgSrc: e.target.result });
          };
          filereader.readAsDataURL(file);
        } else {
          toastr.error('image must be in png, jpeg or gif format');
        }
      });
    } else {
      this.setState({ defaultImgSrc: '../../assets/img/hd8.jpg' });
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
