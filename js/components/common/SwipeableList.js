import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

import EntityStatus from '../common/EntityStatus';

const iconPod = require('../../../images/pod.png');

const SwipeableList = ({ listData, onItemPress, onDeletePress, onRefresh, emptyValue }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const rowSwipeAnimatedValues = {};

  listData.forEach(item => {
    const name = item.name
      ? item.name
      : item.metadata.name;
    rowSwipeAnimatedValues[`${name}`] = new Animated.Value(0);
  });

  const handleRefresh = useCallback(async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
  }, [onRefresh]);

  const onSwipeValueChange = useCallback(swipeData => {
    const { key, value } = swipeData;
    rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  }, [rowSwipeAnimatedValues]);

  const renderItem = useCallback(data => {
    const status = typeof data.item.status === 'string'
      ? data.item.status
      : data.item.status.phase
        ? data.item.status.phase
        : false;

    const name = data.item.name
      ? data.item.name
      : data.item.metadata.name;

    const Container = onDeletePress ? SwipeRow : View;

    return (
      <Container
        style={styles.btnContainer}
        disableRightSwipe
        rightOpenValue={-75}
        // rightOpenValue={-Dimensions.get('window').width} /** will be used if swipe to delete is implemented */
        friction={10}
        swipeKey={name}
        onSwipeValueChange={onSwipeValueChange}
      >
        {onDeletePress && (
          <TouchableOpacity
            onPress={() => onDeletePress(data.item)}
            style={[styles.listItemButton, styles.backRightBtn]}
          >
            <Animated.View
              style={[
                styles.trash,
                {
                  transform: [
                    {
                      scale: rowSwipeAnimatedValues[
                        name
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
        <TouchableHighlight
          style={styles.listItemButton}
          underlayColor={'#AAA'}
          onPress={() => onItemPress(data.item)}
          key={name}
        >
          <View style={styles.itemContainer}>
            <View style={status ? styles.containerLeft : styles.containerLeftNoStatus}>
              {data.item.kind === 'pods' && <Image style={styles.itemIcon} source={iconPod} />}
              <Text style={styles.itemText} numberOfLines={1}>{name}</Text>
            </View>
            <View style={styles.containerRight}>
              <EntityStatus status={status} />
              <Icon
                name="chevron-right"
                size={15}
                color="gray"
                style={styles.arrow}
              />
            </View>
          </View>
        </TouchableHighlight>
      </Container>
    );
  }, [onDeletePress, onItemPress, onSwipeValueChange, rowSwipeAnimatedValues]);

  if (listData.length === 0) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        <Text style={styles.noContentText}>No {`${emptyValue || 'Items'}`} Found</Text>
      </ScrollView>
    );
  }

  return (
    <SwipeListView
      data={listData}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      }
      keyExtractor={item => item.name || item.metadata.name}
    />
  );
};

export default React.memo(SwipeableList);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  noContentText: {
    textAlign: 'center',
    marginTop: '9rem',
    fontSize: '1.3rem',
    color: 'gray',
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
    marginRight: '.6rem',
  },
  containerLeft: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  containerLeftNoStatus: {
    flex: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
