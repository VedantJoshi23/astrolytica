import React from 'react';
import renderer from 'react-test-renderer';

import App from '../src/App';

it('renders the app root', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toBeTruthy();
});
