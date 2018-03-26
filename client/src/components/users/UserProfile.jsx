import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class UserProfile extends React.Component {
  render() {
    const { user } = this.props;
    const profilePix = user.profilePicture ? user.profilePicture :
      'http://res.cloudinary.com/victoradukwu/image/upload/v1521336087' +
      '/avatar7_nt7awy.png';
    return (
      <div className="container">
        <div className="row profilebox">
          <div
            className="
            offset-lg-4 col-lg-4 col-sm-6 col-12 main-section text-center"
          >
            <div className="row">
              <div className="col-lg-12 col-sm-12 col-12 profile-header" />
            </div>
            <div className="row user-detail">
              <div className="col-lg-12 col-sm-12 col-12">
                <img
                  src={profilePix}
                  className="rounded-circle img-thumbnail"
                  alt="userImage"
                />
                <h5>{user.name}</h5>
                <p>
                  <i
                    className="fa fa-map-marker"
                    aria-hidden="true"
                  >{user.location}
                  </i>
                </p>

                <hr />
                Date joined: {(new Date(user.createdAt)).toLocaleDateString()}
                <br />
                Number of recipes contributed:
                {this.props.contribution}
                <br />
                <hr />
              </div>
            </div>
            <div className="row user-social-detail">
              <div className="col-lg-12 col-sm-12 col-12">
                <span className="fa fa-phone"> &nbsp;{user.phoneNumber} </span>
                <span className="fa fa-envelope">&nbsp;{user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  contribution: PropTypes.number
};
UserProfile.defaultProps = {
  contribution: 0
};

const mapStateToProps = state => ({
  user: state.userAuthentication.user,
  contribution: state.userAuthentication.contribution
});

export default connect(mapStateToProps, null)(UserProfile);
