import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OverallScores = (props) => {

  var roundingFunc = (score) => {
    var calculated = Math.round(((score) / props.reviews.length) * 10) / 10;
    return calculated.toString().length === 1 ? calculated + '.0' : calculated.toString();
  };
  var overallMain = 0;
  var overallMainBars = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };
  var overallFood = 0;
  var overallService = 0;
  var overallAmbience = 0;
  var overallValue = 0;
  var noiseLevel = ['Quiet', 'Quiet', 'Moderate', 'Loud'];
  var overallNoise = 0;
  var overallRecommend = 0;

  for (var i = 0; i < props.reviews.length; i++) {
    overallMain += props.reviews[i].overallScore;
    overallMainBars[props.reviews[i].overallScore]++;
    overallFood += props.reviews[i].foodScore;
    overallService += props.reviews[i].serviceScore;
    overallAmbience += props.reviews[i].ambienceScore;
    overallValue += props.reviews[i].valueScore;
    overallNoise += props.reviews[i].noise;
    overallRecommend += props.reviews[i].recommend === 'Y' ? 1 : 0;
  }

  overallMain = roundingFunc(overallMain);
  overallFood = roundingFunc(overallFood);
  overallService = roundingFunc(overallService);
  overallAmbience = roundingFunc(overallAmbience);
  overallValue = roundingFunc(overallValue);
  overallNoise = noiseLevel[Math.floor(Number(roundingFunc(overallNoise)))];
  overallRecommend = Math.round((overallRecommend / props.reviews.length) * 100);

  var overallStars = [];
  for (var i = Number(overallMain); i > 0; i--) {
    if (i >= 1) {
      overallStars.push(
        <FontAwesomeIcon key={'overallScore' + i} icon="star" className="filledScore  starTop" />
      );
    } else if (i < 1 && i >= 0.25) {
      overallStars.push(
        <FontAwesomeIcon key={'overallScorehalf' + i} icon="star-half-alt" className="filledScore starTop" />
      );
    }
  }

  for (var i = 0; i < (5 - Math.ceil(overallMain)); i++) {
    overallStars.push(
      <FontAwesomeIcon key={'overallScoreEmpty' + i} icon={["far", "star"]} className="emptyScore starTop" />
    );
  }

  return (
    <div className="overallScoresContainer">
      <div className="overallScoresRatings">
        <div>
          <div className="overallScoresRatingsSubtitle">Overall ratings and reviews</div>
          <div className="overallScoresRatingsDescription">Reviews can only be made by diners who have eaten at this restaurant</div>
        </div>
        <div className="overallScoresStarsContainer">
          <div className="overallScoresStars">
            {overallStars}
          </div>
          <div className="overallScoresLabelContainer">
            <span className="overallScoresStarsNumber">{overallMain}</span>
            <span className="overallScoresStarsLabel">{' based on recent ratings.'}</span>
          </div>
        </div>
        <div className="overallScoresFSAV">
          <div className="fsavItem">
            <div className="fsavScore">{overallFood}</div>
            <div className="fsavLabel">{'Food'}</div>
          </div>
          <div className="fsavItem">
            <div className="fsavScore">{overallService}</div>
            <div className="fsavLabel">{'Service'}</div>
          </div>
          <div className="fsavItem">
            <div className="fsavScore">{overallAmbience}</div>
            <div className="fsavLabel">{'Ambience'}</div>
          </div>
          <div className="fsavItemValue">
            <div className="fsavScore">{overallValue}</div>
            <div className="fsavLabel">{'Value'}</div>
          </div>
        </div>
        <div className="overallScoresNoise noiseRecommend">
          <div className="overallScoresNoiseIcon">
            <FontAwesomeIcon icon="signal" className="noiseIcon" /></div>
          <div className="overallScoresNoiseRecommendLabel">
            {` Noise · `}
            <span className="overallScoresNoiseScore">{overallNoise}</span>
          </div>
        </div>
        <div className="overallScoresRecommend noiseRecommend">
          <div className="overallScoresRecommendInner">
            <FontAwesomeIcon icon={["far", "thumbs-up"]} className="thumbIcon" />
            <div className="overallScoresNoiseRecommendLabel">
              {` ${overallRecommend}% of people `}
              <span className="overallScoresRecommendLabel">{'would recommend it to a friend'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="overallScoresBarsContainer">
        <div className="overallScoreBarsContainerInner">
          <div className="overallScoreBars">
            <span>{'5'}</span>
            <div className="overallScoresBarsInner">
              <span className="overallScoresBarsColor" style={{ width: (overallMainBars[5] / props.reviews.length) * 100 + '%' }}></span>
            </div>
          </div>
          <div className="overallScoreBars">
            <span>{'4'}</span>
            <div className="overallScoresBarsInner">
              <span className="overallScoresBarsColor" style={{ width: (overallMainBars[4] / props.reviews.length) * 100 + '%' }}></span>
            </div>
          </div>
          <div className="overallScoreBars">
            <span>{'3'}</span>
            <div className="overallScoresBarsInner">
              <span className="overallScoresBarsColor" style={{ width: (overallMainBars[3] / props.reviews.length) * 100 + '%' }}></span>
            </div>
          </div>
          <div className="overallScoreBars">
            <span>{'2'}</span>
            <div className="overallScoresBarsInner">
              <span className="overallScoresBarsColor" style={{ width: (overallMainBars[2] / props.reviews.length) * 100 + '%' }}></span>
            </div>
          </div>
          <div className="overallScoreBars">
            <span>{'1'}</span>
            <div className="overallScoresBarsInner">
              <span className="overallScoresBarsColor" style={{ width: (overallMainBars[1] / props.reviews.length) * 100 + '%' }}></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallScores;