import React from 'react';
import { Button } from 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Button', () => {
  it('renders correctly', () => {
    const buttonTest = renderer
      .create(<Button title="this must be a string" style={{}} />)
      .toJSON();
    expect(buttonTest).toMatchSnapshot();
  });
});
