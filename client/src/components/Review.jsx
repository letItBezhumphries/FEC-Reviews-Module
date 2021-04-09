import React from 'react';
import User from './User.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Review = (props) => {
  var stars = [];
  for (var i = 0; i < props.scoreOverall; i++) {
    stars.push(<FontAwesomeIcon key={'score' + i} icon="star" className="filledScore" />);
  }
  for (var i = 0; i < (5 - props.scoreOverall); i++) {
    stars.push(<FontAwesomeIcon key={'emptyScore' + i} icon={["far", "star"]} className="emptyScore" />);
  }

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var currentDate = props.date;
  var currentDateArray = props.date.split('-');
  var today = new Date();
  var dinedOn = today.getDate() - Number(currentDateArray[2]);
  
  if (today.getFullYear() - Number(currentDateArray[0]) === 0 && (today.getMonth() + 1) - Number(currentDateArray[1]) === 0 && dinedOn <= 7 && dinedOn > 1) {
    currentDate = `Dined ${dinedOn} days ago`;
  } else if (dinedOn === 1) {
    currentDate = 'Dined a day ago';
  } else if (dinedOn === 0) {
    currentDate = 'Dined today';
  } else {
    currentDate = `Dined on ${months[Number(currentDateArray[1])]} ${Number(currentDateArray[2])}, ${currentDateArray[0]}`
  }

  return (
    <article className="userAndReview">
      <User userData={props.user} />
      <div id="reviewBody" className="reviewBody">
        <div id="reviewScores">
          <div id="reviewStarsDate" className="reviewStarsAndDate">
            <div id="reviewStars">
              {stars}
            </div>
            <div id="reviewDate">
              <span id="date">{currentDate}</span>
            </div>
          </div>
          <div id="otherScores">
            <span id="scoreOverallText" className="reviewText">Overall </span>
            <span id="scoreOverallNumber" className="reviewScore">{props.scoreOverall}</span>
            <span id="scoreFoodText" className="reviewText">Food </span>
            <span id="scoreFoodNumber" className="reviewScore">{props.scoreFood}</span>
            <span id="scoreServiceText" className="reviewText">Service </span>
            <span id="scoreServiceNumber" className="reviewScore">{props.scoreService}</span>
            <span id="scoreAmbienceText" className="reviewText">Ambience </span>
            <span id="scoreAmbienceNumber">{props.scoreAmbience}</span>
          </div>
        </div>
        <div id="reviewText">
          <p>{props.text}</p>
        </div>
      </div>
    </article>
  );
};


export default Review;