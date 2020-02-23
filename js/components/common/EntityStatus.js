import React from 'react';
import { View, Text } from 'react-native';
import { Badge } from 'react-native-elements'
import EStyleSheet from 'react-native-extended-stylesheet';
import StatusUtils from '../../utils/StatusUtils';

const EntityStatus = ({ status }) => {
  if (typeof status !== 'string') { return false; }
  const badgeStatusText = status.toUpperCase();
  const statusText = status[0].toUpperCase() + status.slice(1).toLowerCase();

  return (
    <View style={styles.status}>
      <Text style={styles.statusText}>{statusText}</Text>
      <Badge
        status={StatusUtils.statusForBadge(badgeStatusText)}
        badgeStyle={styles.badge}
      />
    </View>
  );
};

export default React.memo(EntityStatus);

const styles = EStyleSheet.create({
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    marginLeft: '.6rem',
    marginTop: '.1rem',
    marginRight: '.2rem',
  },
  statusText: {
    fontSize: 14,
    color: '#929292',
  }
});
