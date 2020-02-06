import { GoogleSignin, statusCodes } from 'react-native-google-signin';

export default class GoogleCloudApi {

  static configureGoogleSignin() {
    console.log('CONFIGURING.......')
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      iosClientId: '',
    });
    console.log('CONFIGURED!!')
  }

  // static signIn = async () => {
  //   try {
  //     GoogleCloudApi.configureGoogleSignin();
  //     const user = await GoogleSignin.signIn();
  //     if (!user) {
  //       return GoogleSignin.signIn();
  //     }
  //     console.log('user: ', user);
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }


  static signIn = async () => {
    try {
      console.log('BEFORE')
      GoogleCloudApi.configureGoogleSignin();
      console.log('AFTER')
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('THIS IS USER INFO AND SIGNIN CONFERMATION =====>', userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Error 1')
        // GoogleCloudApi.signOut();
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('Error 22')
        // GoogleCloudApi.signOut();
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('Error 3')
        // GoogleCloudApi.signOut();
      } else {
        // some other error happened
        console.log('Error 4')
        // GoogleCloudApi.signOut();
      }
    }
  };

  static signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log('Signed Out!')
    } catch (error) {
      console.error(error);
    }
  };










}