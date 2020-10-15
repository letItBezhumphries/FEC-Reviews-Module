import React from 'react';
import { shallow } from 'enzyme';
import Review from '../client/src/components/Review.jsx';
import User from '../client/src/components/User.jsx';
import App from '../client/src/components/App.jsx';

describe('It should render individual components', ()=>{
  test('User component renders correctly', () => {
    const wrapper = shallow(<User/>);
    expect(wrapper).toMatchSnapshot();
  });

  test('Review component renders correctly', () => {
    const wrapper = shallow(<Review
      date={'2019-02-21'}
      scoreOverall={4}
      scoreFood={4}
      scoreService={3}
      scoreAmbience={5}
      text={'words'}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  test('App component renders correctly', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper).toMatchSnapshot();
  });
})
