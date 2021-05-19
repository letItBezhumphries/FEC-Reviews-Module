import React from 'react';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faSignal } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyFaStar, faCommentAlt, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
library.add(faStar, faStarHalfAlt, faCommentAlt, faSignal, emptyFaStar, faThumbsUp);
import Review from './Review.jsx';
import TagsSorting from './TagsSorting.jsx';
import OverallScores from './OverallScores.jsx';
import "../assets/reviewsStyle.css";

class ReviewsMainModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [{
        "id": 1, "userId": 42, "restaurantId": "thfUjkN4Tv", "reviewDate": "2019-02-21", "text": "Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.", "tags": "Vibrant Bar Scene, Organic, Quick Bite, Open Kitchen, Cellar, Couples, Vegan", "overallScore": 1, "foodScore": 3, "serviceScore": 3, "ambienceScore": 5, "valueScore": 4, "noise": 1, "recommend": "N", "createdAt": "2019-02-15T20:26:17.000Z", "updatedAt": "2019-02-15T20:26:17.000Z",
        "user": { "id": 38, "username": "BrokenTableDiner", "location": "Seattle", "vip": "Yes", "reviewNumber": 10 }
      },
      {
        "id": 2, "userId": 34, "restaurantId": "thfUjkN4Tv", "reviewDate": "2019-02-22", "text": "Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.", "tags": "Vibrant Bar Scene, Organic, Quick Bite, Open Kitchen, Couples, Vegan", "overallScore": 4, "foodScore": 3, "serviceScore": 3, "ambienceScore": 5, "valueScore": 4, "noise": 1, "recommend": "Y", "createdAt": "2019-02-15T20:26:17.000Z", "updatedAt": "2019-02-15T20:26:17.000Z",
        "user": { "id": 34, "username": "MikeR", "location": "Seattle", "vip": "No", "reviewNumber": 7 }
      },
      {
        "id": 3, "userId": 32, "restaurantId": "thfUjkN4Tv", "reviewDate": "2019-02-22", "text": "Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.", "tags": "Vibrant Bar Scene, Organic, Quick Bite, Open Kitchen, Couples, Vegan", "overallScore": 5, "foodScore": 4, "serviceScore": 3, "ambienceScore": 5, "valueScore": 4, "noise": 1, "recommend": "Y", "createdAt": "2019-02-15T20:26:17.000Z", "updatedAt": "2019-02-15T20:26:17.000Z",
        "user": { "id": 32, "username": "MikeS", "location": "Seattle", "vip": "No", "reviewNumber": 7 }
      }],
      filteredReviews: [{
        "id": 1, "userId": 42, "restaurantId": "thfUjkN4Tv", "reviewDate": "2019-02-21", "text": "Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.", "tags": "Vibrant Bar Scene, Organic, Quick Bite, Open Kitchen, Cellar, Couples, Vegan", "overallScore": 1, "foodScore": 3, "serviceScore": 3, "ambienceScore": 5, "valueScore": 4, "noise": 1, "recommend": "N", "createdAt": "2019-02-15T20:26:17.000Z", "updatedAt": "2019-02-15T20:26:17.000Z",
        "user": { "id": 38, "username": "BrokenTableDiner", "location": "Seattle", "vip": "Yes", "reviewNumber": 10 }
      },
      {
        "id": 2, "userId": 34, "restaurantId": "thfUjkN4Tv", "reviewDate": "2019-02-22", "text": "Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.", "tags": "Vibrant Bar Scene, Organic, Quick Bite, Open Kitchen, Couples, Vegan", "overallScore": 4, "foodScore": 3, "serviceScore": 3, "ambienceScore": 5, "valueScore": 4, "noise": 1, "recommend": "Y", "createdAt": "2019-02-15T20:26:17.000Z", "updatedAt": "2019-02-15T20:26:17.000Z",
        "user": { "id": 34, "username": "MikeR", "location": "Seattle", "vip": "No", "reviewNumber": 7 }
      },
      {
        "id": 3, "userId": 32, "restaurantId": "thfUjkN4Tv", "reviewDate": "2019-02-22", "text": "Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.", "tags": "Vibrant Bar Scene, Organic, Quick Bite, Open Kitchen, Couples, Vegan", "overallScore": 5, "foodScore": 4, "serviceScore": 3, "ambienceScore": 5, "valueScore": 4, "noise": 1, "recommend": "Y", "createdAt": "2019-02-15T20:26:17.000Z", "updatedAt": "2019-02-15T20:26:17.000Z",
        "user": { "id": 32, "username": "MikeS", "location": "Seattle", "vip": "No", "reviewNumber": 7 }
      }],
      popularTags: ['Organic', 'Cellar', 'Not Valid'],
      checkedTags: []
    };
    this.filterByTag = this.filterByTag.bind(this);
    this.filterBySelect = this.filterBySelect.bind(this);
    this.scrollToFilter = this.scrollToFilter.bind(this);
  }

  scrollToFilter() {
    document.getElementById('tagsSorting').scrollIntoView({ block: 'start', behavior: "smooth" });
  }

  filterByTag(e) {
    if (e.target.checked) {
      this.setState({
        checkedTags: this.state.checkedTags.concat([e.target.labels[0].id])
      });
    } else if (e.target.checked === false) {
      var removeTag = this.state.checkedTags.slice();
      removeTag.splice(removeTag.indexOf(e.target.labels[0].id), 1);
      this.setState({
        checkedTags: removeTag
      });
    }
  }

  filterBySelect(e) {
    if (e.target.value === 'Lowest rating') {
      this.setState({
        filteredReviews: this.state.filteredReviews.sort((a, b) => a.overallScore - b.overallScore)
      });
    } else if (e.target.value === 'Highest rating') {
      this.setState({
        filteredReviews: this.state.filteredReviews.sort((a, b) => b.overallScore - a.overallScore)
      });
    } else if (e.target.value === 'Newest') {
      this.setState({
        filteredReviews: this.state.filteredReviews.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate))
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.checkedTags.length !== prevState.checkedTags.length) {
      this.setState({
        filteredReviews: this.state.reviews.filter((review) => {
          return this.state.checkedTags.every((tag) => review.tags.indexOf(tag) >= 0);
        })
      });
    }
  }


  componentDidMount() {
    var restaurantId = location.pathname.split('/')[2];
    axios.get(`${process.env.PROD_REVIEWS_API_URL}` + `${restaurantId}/reviews`)
      .then((result) => {

        var allTags = [];
        for (var i = 0; i < result.data.length; i++) {
          allTags = allTags.concat(result.data[i].tags.split(', '))
        }

        var popTags = {};
        for (var i = 0; i < allTags.length; i++) {
          if (!popTags[allTags[i]]) {
            popTags[allTags[i]] = 1;
          } else {
            popTags[allTags[i]]++
          }
        }

        popTags = Object.keys(popTags)
          .sort((a, b) => b - a);

        this.setState({
          reviews: result.data,
          filteredReviews: result.data,
          popularTags: popTags
        });
      })
  }
  
  render() {
    var mappedReviews = this.state.filteredReviews.map((review, i) =>
      <Review
        key={'review' + i}
        date={review.reviewDate}
        scoreOverall={review.overallScore}
        scoreFood={review.foodScore}
        scoreService={review.serviceScore}
        scoreAmbience={review.ambienceScore}
        text={review.text}
        user={review.user} />
    );

    if (this.state.reviews.length === 0) {
      return (
        <div className="reviewModuleContainer container">
          <h3>{'Be the First to Review This Restaurant'}
            <span className="writeReview">{'Write a review'}</span>
          </h3>
          <div className="userAndReview">
            {'At present, this restaurant has no reviews. Please add a review after your dining experience to help others make a decision about where to eat.'}
          </div>
        </div>
      );
    } else {
      return (
        <div className="reviewModuleContainer container">
          <h3>What {this.state.reviews.length} People Are Saying</h3>
          <OverallScores reviews={this.state.reviews} />
          <TagsSorting
            tagList={this.state.popularTags}
            filterByTag={this.filterByTag}
            reviewNumber={this.state.filteredReviews}
            filterBySelect={this.filterBySelect}
            scrollToFilter={this.scrollToFilter} />
          {mappedReviews}
        </div>
      );
    }
  }
}

export default ReviewsMainModule;