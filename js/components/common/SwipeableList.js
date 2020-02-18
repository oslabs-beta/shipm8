import React from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SwipeListView } from 'react-native-swipe-list-view';

import EntityStatus from './EntityStatus';

const SwipeableList = ({ entities, handleItemPress, handleTrashPress }) => {
  const rowSwipeAnimatedValues = {};

  entities.forEach(entity => {
    rowSwipeAnimatedValues[`${entity.metadata.uid}`] = new Animated.Value(0);
  });

  const onSwipeValueChange = swipeData => {
    const { key, value } = swipeData;
    rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  };

  const renderItem = data => {
    return (
      <TouchableHighlight
        onPress={() => handleItemPress(data.item)}
        style={styles.listItemButton}
        underlayColor={'#AAA'}
        key={data.item.metadata.name}
      >
        <View style={styles.itemContainer}>
          <View style={typeof data.item.status.phase === 'string' ? styles.containerLeft : styles.containerLeftNoStatus}>
            <Image style={styles.itemIcon} source={require('../../../images/pod.png')} />
            <Text style={styles.itemText} numberOfLines={1}>{data.item.metadata.name}</Text>
          </View>
          <View style={styles.containerRight}>
            <EntityStatus status={data.item.status.phase} />
            <Icon
              name="chevron-right"
              size={15}
              color="gray"
              style={styles.arrow}
            />
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  return (
    <View style={styles.container}>
      <SwipeListView
        disableRightSwipe={true}
        data={entities}
        keyExtractor={item => item.metadata.uid}
        renderItem={renderItem}
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity
            style={[styles.listItemButton, styles.backRightBtn]}
            onPress={() =>
              handleTrashPress(data.item)
            }
          >
            <Animated.View
              style={[
                styles.trash,
                {
                  transform: [
                    {
                      scale: rowSwipeAnimatedValues[
                        data.item.metadata.uid
                      ].interpolate({
                        inputRange: [
                          0,
                          75,
                        ],
                        outputRange: [0, 1],
                        extrapolate:
                          'clamp',
                      }),
                    },
                  ],
                },
              ]}
            >
              <Image
                source={require('../../../images/trash.png')}
                style={styles.trash}
              />
            </Animated.View>
          </TouchableOpacity>
        )}
        rightOpenValue={-75}
        onSwipeValueChange={onSwipeValueChange}
      />
    </View>
  );
}

export default React.memo(SwipeableList);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  arrow: {
    marginLeft: '.4rem',
    marginTop: '.2rem',
  },
  containerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '.6rem'
  },
  containerLeft: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  containerLeftNoStatus: {
    flex: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  badge: {
    marginLeft: '.6rem',
    marginTop: '.1rem',
    marginRight: '.2rem',
  },
  listItemButton: {
    marginTop: '.4rem',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '3.5rem',
    borderRadius: 8,
    alignSelf: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    width: '98%',
    paddingLeft: '2.5%',
    borderStyle: 'solid',
    borderColor: '#063CB9',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  itemText: {
    fontSize: '1rem',
    flex: 1,
    marginLeft: '.5rem',
    marginRight: '2rem',
    overflow: 'scroll',
  },
  itemIcon: {
    width: '2rem',
    height: '2rem',
  },
  backRightBtn: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    width: '4.7rem',
    borderRadius: 8,
    marginRight: '.3rem',
    backgroundColor: 'red',
  },
  trash: {
    height: '1.5rem',
    width: '1.5rem',
  },
});
