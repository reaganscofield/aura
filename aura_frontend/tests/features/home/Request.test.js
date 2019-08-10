import React from 'react';
import { shallow } from 'enzyme';
import { Request } from '../../../src/features/home/Request';

describe('home/Request', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Request {...props} />
    );

    expect(
      renderedComponent.find('.home-request').length
    ).toBe(1);
  });
});
