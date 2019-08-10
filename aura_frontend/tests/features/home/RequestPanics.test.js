import React from 'react';
import { shallow } from 'enzyme';
import { RequestPanics } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RequestPanics />);
  expect(renderedComponent.find('.home-request-panics').length).toBe(1);
});
