import React from 'react';
import { View, Text } from 'react-native';
import renderer from 'react-test-renderer';

describe('Text', () => {
  it('renders correctly', () => {
    const instance = renderer
      .create(
        <View style={{}}>
          <Text>React-Native Text Test</Text>
        </View>,
      )
      .toJSON();

    expect(instance).toMatchSnapshot();
  });
});
