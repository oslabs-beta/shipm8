import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';

class GoogleCloudApi {

  static configureGoogleSignin = () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      iosClientId: '303534223167-ath57063kfqkggvbuie92dta1jm6r6q2.apps.googleusercontent.com'
    });
  }

  static signIn = async () => {
    try {
      this.configureGoogleSignin()
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return userInfo;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  static getAccessToken = async () => {
    try {
      const accessToken = (await GoogleSignin.getTokens()).accessToken;
      return accessToken;
    } catch (err) {
      console.log(err);
    }
  }

  static signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (err) {
      console.error(err);
    }
  };

}

export default GoogleCloudApi;
