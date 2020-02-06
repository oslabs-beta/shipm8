import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Text, TouchableOpacity } from 'react-native';

describe('TouchableOpacity', () => {
  it('renders correctly', () => {
    const instance = renderer
      .create(
        <TouchableOpacity style={{}}>
          <Text>This should be a button</Text>
        </TouchableOpacity>,
      )
      .toJSON();

    expect(instance).toMatchSnapshot();
  });
});
