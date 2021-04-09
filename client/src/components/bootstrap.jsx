import React from 'react';
import ReactDOM from 'react-dom';
import ReviewsMainModule from './ReviewsMainModule.jsx';

// var standalone = document.getElementById('ReviewsMainModule');
// var proxy = document.getElementById('ReviewsMainModuleProxy');

// if (standalone) {
//   ReactDOM.render(<ReviewsMainModule/>, standalone);
// } else {
//   ReactDOM.render(<ReviewsMainModule/>, proxy);
// }

const mountReviews = (elem) => {
  ReactDOM.render(<ReviewsMainModule/>, elem);
};

if (process.env.NODE_ENV === 'development') {
  const standalone = document.getElementById('ReviewsMainModule');

  if (standalone) {
    mountReviews(standalone);
  }
}

export { mountReviews };
