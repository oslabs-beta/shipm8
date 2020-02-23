import { Alert } from 'react-native';

class AlertUtils {

  static deleteEntityPrompt = (item, callback) => {
    const message = item.kind
      ? `This will delete ${item.name || item.metadata.name} from your cluster`
      : `This will remove ${item} from your added clusters`;

    return Alert.alert(
      'Are you sure?',
      message,
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Delete', onPress: () => {
            callback();
          }
          , style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  };

  static deleteSuccessAlert = item => {
    const messageTitle = item.kind
      ? 'Delete Successful'
      : 'Remove Successful';

    const message = item.kind
      ? `${item.name || item.metadata.name} has been deleted.`
      : `${item} has been removed.`;

    return Alert.alert(
      messageTitle,
      message,
      [
        {
          text: 'OK',
          style: 'default',
        },
      ]
    );
  }
}

export default AlertUtils;
