import { AsyncStorage } from 'react-native'

export const ACCESS_TOKEN = 'access_token';

export async function saveToken(token) {
  try {
    let response = await AsyncStorage.setItem(ACCESS_TOKEN, token);
    return response;
  } catch(error) {
    console.log('[saveToken] error saving token', error);
  }
}

export async function getToken() {
  try {
    let response = await AsyncStorage.getItem(ACCESS_TOKEN);
    return response;
  } catch(error) {
    console.log('[getToken] error getting token', error);
  }
}

export async function removeToken() {
  try {
    let response = await AsyncStorage.removeItem(ACCESS_TOKEN);
    return response;
  } catch(error) {
    console.log('[removeToken] error removing token', error);
  }
}

export async function isSignedIn() {
  try {
    let response = await getToken();
    return response !== null;
  } catch(error) {
    console.log('[isSignedIn] error while check signed', error);
  }
}