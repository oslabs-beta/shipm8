import React from 'react';
import { View, Image } from 'react-native';
import renderer from 'react-test-renderer';

describe('Image', () => {
  it('renders correctly', () => {
    const image = renderer
      .create(
        <View>
          <Image />
        </View>,
      )
      .toJSON();
    expect(image).toMatchSnapshot();
  });
});
