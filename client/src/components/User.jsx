import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const User = (props) => {
  var vipStatus = props.userData.vip === 'Yes' ? <span className="userVip">{'VIP'}</span> : '';

  var pictureColors = ['#6C8AE4', '#DF4E96', '#D86441', '#bb6acd'];
  var userColor = pictureColors[Math.floor(Math.random() * pictureColors.length)];

  var initials = [];
  for (var i = 0; i < props.userData.username.length; i++) {
    if (props.userData.username[i].match(/[A-Z]/) && initials.length < 2) {
      initials.push(props.userData.username[i]);
    }
  }

  return (
    <div className="user">
      <div className="userPictureContainer">
        <div className="userPicture" style={{backgroundColor: userColor}}>
          <div className="userInitials">{initials.join('').toUpperCase()}</div>
        </div>
      </div>
      <div className="userData">
        <div className="userNameVip">
          {vipStatus}
          <span className="userName">{props.userData.username}</span>
        </div>
        <span className="userLocation">{props.userData.location}</span>
        <div className="userReviewNumberOuter">
          <span className="userReviewNumberInner">
            <FontAwesomeIcon icon={["far", "comment-alt"]} className="commentsCount" />
            {` ${props.userData.reviewNumber} Reviews`}
          </span>
        </div>
      </div>
    </div>
  )
};

export default User;