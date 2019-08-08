import React from 'react';
import { shallow } from 'enzyme';
import { Companies } from '../../../src/features/home/Companies';

describe('home/Companies', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Companies {...props} />
    );

    expect(
      renderedComponent.find('.home-companies').length
    ).toBe(1);
  });
});
