import React from 'react';
import ReactDOM from 'react-dom';
import ReviewsMainModule from './ReviewsMainModule.jsx';

const mountReviewsModule = (elem) => {
  ReactDOM.render(<ReviewsMainModule/>, elem);
};

if (process.env.NODE_ENV === 'development') {
  const standalone = document.getElementById('ReviewsMainModule');

  if (standalone) {
    mountReviewsModule(standalone);
  }
}

export { mountReviewsModule };
