import React from 'react';
import User from './User.jsx';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/reviewsStyle.css';

const Review = ({ scoreFood, scoreOverall, scoreAmbience, scoreService, text, date, user }) => {
  console.log('review', typeof user);

  const stars = [];
  for (let i = 0; i < scoreOverall; i++) {
    stars.push(<FontAwesomeIcon key={'score' + i} icon="star" className="filledScore" />);
  }
  for (let i = 0; i < 5 - scoreOverall; i++) {
    stars.push(<FontAwesomeIcon key={'emptyScore' + i} icon={['far', 'star']} className="emptyScore" />);
  }

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let currentDate = date;
  const currentDateArray = date.split('-');
  const today = new Date();
  const dinedOn = today.getDate() - Number(currentDateArray[2]);

  if (today.getFullYear() - Number(currentDateArray[0]) === 0 && today.getMonth() + 1 - Number(currentDateArray[1]) === 0 && dinedOn <= 7 && dinedOn > 1) {
    currentDate = `Dined ${dinedOn} days ago`;
  } else if (dinedOn === 1) {
    currentDate = 'Dined a day ago';
  } else if (dinedOn === 0) {
    currentDate = 'Dined today';
  } else {
    currentDate = `Dined on ${months[Number(currentDateArray[1])]} ${Number(currentDateArray[2])}, ${currentDateArray[0]}`;
  }

  return (
    <article className="userAndReview">
      <User userData={user} />
      <div id="reviewBody" className="reviewBody">
        <div id="reviewScores">
          <div id="reviewStarsDate" className="reviewStarsAndDate">
            <div id="reviewStars">{stars}</div>
            <div id="reviewDate">
              <span id="date">{currentDate}</span>
            </div>
          </div>
          <div id="otherScores">
            <span id="scoreOverallText" className="reviewText">
              Overall{' '}
            </span>
            <span id="scoreOverallNumber" className="reviewScore">
              {scoreOverall}
            </span>
            <span id="scoreFoodText" className="reviewText">
              Food{' '}
            </span>
            <span id="scoreFoodNumber" className="reviewScore">
              {scoreFood}
            </span>
            <span id="scoreServiceText" className="reviewText">
              Service{' '}
            </span>
            <span id="scoreServiceNumber" className="reviewScore">
              {scoreService}
            </span>
            <span id="scoreAmbienceText" className="reviewText">
              Ambience{' '}
            </span>
            <span id="scoreAmbienceNumber">{scoreAmbience}</span>
          </div>
        </div>
        <div id="reviewText">
          <p>{text}</p>
        </div>
      </div>
    </article>
  );
};

Review.propTypes = {
  scoreFood: PropTypes.number,
  scoreOverall: PropTypes.number,
  scoreAmbience: PropTypes.number,
  scoreService: PropTypes.number,
  text: PropTypes.string,
  date: PropTypes.string,
  user: PropTypes.object
};

export default Review;
