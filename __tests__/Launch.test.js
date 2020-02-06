import 'react-native';
import React from 'react';
import Launch from '../js/components/Launch';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Launch Component', () => {
  it('renders correctly', () => {
    const launchTest = renderer.create(<Launch />).toJSON();
    expect(launchTest).toMatchSnapshot();
  });
});
