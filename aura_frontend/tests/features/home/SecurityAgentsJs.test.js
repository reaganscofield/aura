import React from 'react';
import { shallow } from 'enzyme';
import { SecurityAgentsJs } from '../../../src/features/home/SecurityAgentsJs';

describe('home/SecurityAgentsJs', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SecurityAgentsJs {...props} />
    );

    expect(
      renderedComponent.find('.home-security-agents-js').length
    ).toBe(1);
  });
});
