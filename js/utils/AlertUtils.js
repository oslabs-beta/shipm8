import { Alert } from 'react-native';

class AlertUtils {

  static deleteEntityPrompt = (item, callback) => {
    return Alert.alert(
      'Are you sure?',
      `This will delete ${item} from your cluster`,
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
    return Alert.alert(
      'Delete Successful',
      `${item} has been deleted.`,
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
