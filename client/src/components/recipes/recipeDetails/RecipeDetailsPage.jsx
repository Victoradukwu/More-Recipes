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

class RecipeDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      category: '',
      comment: '',
      recipeId: 0
    };
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleReview = this.handleReview.bind(this);
    this.setIsVisible = this.setIsVisible.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }
  componentWillMount() {
    const editRecipeId = this.props.match.params.id;
    this.props.getSingleRecipe(editRecipeId);
    this.setState({ recipeId: editRecipeId });
  }
  setIsVisible(state) {
    this.setState({
      isVisible: state
    });
  }

  isSignedIn() {
    if (localStorage.token === undefined) {
      this.props.history.push('/signin');
    }
  }

  handleUpvote(id) {
    this.props.upvoteRecipe(id);
  }
  handleDownvote(id) {
    this.props.downvoteRecipe(id);
  }
  handleFavorite(id, category) {
    this.props.favoriteRecipe(id, category);
  }
  handleReview(id, comment) {
    this.props.reviewRecipe(id, comment);
  }

  handleCategoryChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
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
              isVisible={this.state.isVisible}
              setIsVisible={this.setIsVisible}
              recipe={this.props.recipe}
              upvoteRecipe={this.handleUpvote}
              downvoteRecipe={this.handleDownvote}
              favoriteRecipe={this.handleFavorite}
              handleCategoryChange={this.handleCategoryChange}
              category={this.state.category}
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
  history: PropTypes.object.isRequired,
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
