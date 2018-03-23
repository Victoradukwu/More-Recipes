import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Ratings from './Ratings.jsx';
import RecipeInfo from './RecipeInfo.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewsList from './ReviewsList.jsx';
import {
  getSingleRecipe,
  upvoteRecipe,
  downvoteRecipe,
  favoriteRecipe,
  addRecipeReview
} from '../../../actions/recipeActions';

export class RecipeDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      recipeId: 0
    };
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleReview = this.handleReview.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  componentWillMount() {
    const editRecipeId = parseInt(this.props.match.params.id, 10);
    this.props.getSingleRecipe(editRecipeId);
    this.setState({ recipeId: editRecipeId });
  }

  isSignedIn() {
    if (localStorage.token === undefined) {
      this.props.history.push('/signin');
    }
  }
  /**
 * @description a function that handles upvote of a recipe
 *
 * @param { number } id: unique Id of the recipe to upvote
 *
 * @memberof RecipeDetailsPage
 * @returns {any} null
 */
  handleUpvote(id) {
    this.props.upvoteRecipe(id);
  }

  /**
 * @description handles recipe downvote
 *
 * @param { number } id
 *
 * @memberof RecipeDetailsPage
 * @returns {any} null
 */
  handleDownvote(id) {
    this.props.downvoteRecipe(id);
  }

  /**
   * @description function that is called when a user
   * adds a recipe to his favorites
   *
   * @param {any} id
   *
   * @memberof RecipeDetailsPage
   * @returns {any} null
   */
  handleFavorite(id) {
    this.props.favoriteRecipe(id);
  }

  /**
   * @description function that is called when a user
   * posts a review about a recipe
   *
   * @param {any} event
   *
   * @memberof RecipeDetailsPage
   * @returns {any} null
   */
  handleReview(event) {
    event.preventDefault();
    const { recipeId, comment } = this.state;

    this.props.reviewRecipe(recipeId, comment);
    this.setState({ comment: '' });
  }

  /**
   * @description function that handles the OnChange event of
   * the review comment
   *
   * @param {any} event
   *
   * @memberof RecipeDetailsPage
   * @returns {any} null
   */
  handleCommentChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    this.isSignedIn();
    return (
      <div>
        <br /><br />
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <Ratings
              recipe={this.props.recipe}
              upvoteRecipe={this.handleUpvote}
              downvoteRecipe={this.handleDownvote}
              favoriteRecipe={this.handleFavorite}
            />
            <RecipeInfo recipe={this.props.recipe} />
            <ReviewForm
              handleCommentChange={this.handleCommentChange}
              comment={this.state.comment}
              addReview={this.handleReview}
              recipeId={this.state.recipeId}
            />
            {
              this.props.recipe.reviews &&
              <ReviewsList recipe={this.props.recipe} />
            }
          </div>
          <div className="col-sm-2" />
        </div>
        <br /><br />
      </div>
    );
  }
}
RecipeDetailsPage.propTypes = {
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
  }),
  getSingleRecipe: PropTypes.func.isRequired,
  reviewRecipe: PropTypes.func.isRequired,
  upvoteRecipe: PropTypes.func,
  downvoteRecipe: PropTypes.func,
  favoriteRecipe: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  match: PropTypes.any.isRequired
};

RecipeDetailsPage.defaultProps = {
  recipe: {},
  upvoteRecipe: '',
  downvoteRecipe: '',
  favoriteRecipe: ''
};

const mapStateToProps = state => ({
  recipe: state.singleRecipe
});

const mapDispatchToProps = dispatch => ({
  getSingleRecipe: id => dispatch(getSingleRecipe(id)),
  upvoteRecipe: id => dispatch(upvoteRecipe(id)),
  downvoteRecipe: id => dispatch(downvoteRecipe(id)),
  favoriteRecipe: (id, category) => dispatch(favoriteRecipe(id, category)),
  reviewRecipe: (id, comment) => dispatch(addRecipeReview(id, comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailsPage);

