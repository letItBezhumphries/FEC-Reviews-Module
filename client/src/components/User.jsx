import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/reviewsStyle.css';

const User = ({ userData }) => {
  const vipStatus = userData.vip === 'Yes' ? <span className="userVip">{'VIP'}</span> : '';

  const pictureColors = ['#6C8AE4', '#DF4E96', '#D86441', '#bb6acd'];
  const userColor = pictureColors[Math.floor(Math.random() * pictureColors.length)];

  const initials = [];
  for (let i = 0; i < userData.username.length; i++) {
    if (userData.username[i].match(/[A-Z]/) && initials.length < 2) {
      initials.push(userData.username[i]);
    }
  }

  return (
    <div className="user">
      <div className="userPictureContainer">
        <div className="userPicture" style={{ backgroundColor: userColor }}>
          <div className="userInitials">{initials.join('').toUpperCase()}</div>
        </div>
      </div>
      <div className="userData">
        <div className="userNameVip">
          {vipStatus}
          <span className="userName">{userData.username}</span>
        </div>
        <span className="userLocation">{userData.location}</span>
        <div className="userReviewNumberOuter">
          <span className="userReviewNumberInner">
            <FontAwesomeIcon icon={['far', 'comment-alt']} className="commentsCount" />
            {` ${userData.reviewNumber} Reviews`}
          </span>
        </div>
      </div>
    </div>
  );
};

User.propTypes = {
  userData: PropTypes.object
};

export default User;
