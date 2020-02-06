import 'react-native';
import React from 'react';
import SignOut from '../js/components/SignOut';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('SignOut Component', () => {
  it('renders correctly', () => {
    const signOut = renderer.create(<SignOut />).toJSON();
    expect(signOut).toMatchSnapshot();
  });
});
