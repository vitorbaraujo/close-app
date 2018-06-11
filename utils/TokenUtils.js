import { AsyncStorage } from 'react-native'

export const ACCESS_TOKEN = 'access_token';

export async function saveToken(token) {
  try {
    let response = await AsyncStorage.setItem(ACCESS_TOKEN, token);
    return response;
  } catch(error) {
    console.log('error saving token', error);
  }
}

export async function getToken() {
  try {
    let response = await AsyncStorage.getItem(ACCESS_TOKEN);
    return response;
  } catch(error) {
    console.log('error getting token', error);
  }
}

export async function removeToken() {
  try {
    let response = await AsyncStorage.removeItem(ACCESS_TOKEN);
    return response;
  } catch(error) {
    console.log('error removing token', error);
  }
}

export function isSignedIn() {
  let response = getToken();
  return response !== null;
}