import React from 'react';
import { shallow } from 'enzyme';
import { Users } from '../../../src/features/home/Users';

describe('home/Users', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Users {...props} />
    );

    expect(
      renderedComponent.find('.home-users').length
    ).toBe(1);
  });
});
