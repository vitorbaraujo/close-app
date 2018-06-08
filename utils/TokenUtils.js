import { AsyncStorage } from 'react-native'

const ACCESS_TOKEN = 'access_token';

const TokenUtils = {
  storeToken: async function(accessToken) {
    console.log('hello there')
    try {
      console.log('just trying');
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      let token = await this.getToken();
      return token;
    } catch(error) {
      console.log('error storing token: ', error)
    }
  },
  getToken: async function() {
    console.log('why so serious?')
    let token = null;
    try {
      console.log('getting token');
      token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log('token got', token);
      return token;
    } catch (error) {
      console.log('error storing token: ', error)
    }
  },
  removeToken: async function() {
    let returnValue = false;
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      let token = await this.getToken();
      return returnValue = (token === null);
    } catch(error) {
      console.log('error while removing token', error)
    }
  },
  isSignedIn: async function() {
    let response = await this.getToken();
    return response !== null;
  }
}

export default TokenUtils;