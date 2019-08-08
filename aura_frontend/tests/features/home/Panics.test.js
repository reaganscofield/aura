import React from 'react';
import { shallow } from 'enzyme';
import { Panics } from '../../../src/features/home/Panics';

describe('home/Panics', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Panics {...props} />
    );

    expect(
      renderedComponent.find('.home-panics').length
    ).toBe(1);
  });
});
