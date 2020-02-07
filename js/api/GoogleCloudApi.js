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
      return userInfo
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Error 1')
        // GoogleCloudApi.signOut();
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('Error 2')
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

  static getToken = async () => {
    try {
      const accessToken = await GoogleSignin.getTokens();
      console.log('access token in gettoken', accessToken)
      return accessToken.accessToken
    }
    catch (error) {
      alert("Error getting token")
    }
  }

  static getProjects = async (token) => {
    try {
      console.log('token in getprojects', token)
      const authHeader = {
        Authorization: `Bearer ${token}`,
      }
      const projects = await fetch('https://container.googleapis.com/v1beta1', authHeader).then(res => res.json());
      console.log('PROJECTS DATA =========>', projects);

    }
    catch (error) {
      alert(error)
    }

  }

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