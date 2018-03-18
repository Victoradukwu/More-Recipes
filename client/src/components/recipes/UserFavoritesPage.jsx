import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserFavorites } from '../../actions/recipeActions';
import FavoriteRecipe from './FavoriteRecipe';


class UserFavoritesPage extends Component {
  componentDidMount() {
    this.props.fetchUserFavorites();
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-3" />
        <div className="col-sm-6">
          <table className="table tableResponsive w-auto table-hover">
            <thead>
              <tr>
                <th>Recipe Name</th>
                <th>Owner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.props.userFavorites.map(userFavorite =>
              (<FavoriteRecipe
                key={userFavorite.Recipe.id}
                userFavorite={userFavorite}
              />))
            }

            </tbody>
          </table>
        </div>
        <div className="col-sm-3" />
      </div>
    );
  }
}

UserFavoritesPage.propTypes = {
  userFavorites: PropTypes.array,
  fetchUserFavorites: PropTypes.func.isRequired
};

UserFavoritesPage.defaultProps = {
  userFavorites: [],
};

const mapStateToProps = state => ({
  userFavorites: state.userFavorites
});

export default connect(mapStateToProps, {
  fetchUserFavorites,
})(UserFavoritesPage);

