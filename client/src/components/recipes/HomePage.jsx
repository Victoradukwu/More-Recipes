import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import Recipe from './Recipe';

import { fetchRecipes } from '../../actions/recipeActions';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);

    this.state = { recipes: [] };
  }

  componentDidMount() {
    this.props.fetchRecipes('/api/v1/recipes?sort=upvotes&order=des');
  }

  handlePageClick(data) {
    const selected = data.selected + 1;
    this.props.fetchRecipes(`/api/v1/recipes?sort=upvotes&order=des&page=${selected}`);
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <img alt="" src={require('../../assets/img/img001.jpeg')} style={{ width: '100%', height: '620px' }} />
        </div>
        <h4>
          <small>Our top picks</small>
        </h4>
        <hr />
        <div className="container">
          <div className="container bg-3 text-center main-content">
            <div className="grid-holder">
              {this.props.payload.recipes.map(recipe => (
                <Recipe key={recipe.id} recipe={recipe} />
          ))}
            </div>
          </div>
          <br />

          <ReactPaginate
            previousLabel="&laquo;"
            nextLabel="&raquo;"
            breakClassName="break-me"
            pageCount={this.props.payload.pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName="pagination pagination-lg justify-content-center"
            subContainerClassName="page-item"
            activeClassName="active"
          />
          <br /><br />
          <br /><br />
        </div>
      </div>
    );
  }
}
HomePage.propTypes = {
  fetchRecipes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isloading: state.fetchRecipeRequest,
  hasErrored: state.fetchRecipeFailure,
  payload: state.fetchRecipeSuccess
});

const mapDispatchToProps = dispatch => ({
  fetchRecipes: url => dispatch(fetchRecipes(url))
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
