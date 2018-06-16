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

export async function getItem(key) {
  try {
    let response = await AsyncStorage.getItem(key);
    return response;
  } catch (error) {
    console.log('[getItem] error getting', key, error);
  }
}

export async function saveItem(key, value) {
  try {
    let response = await AsyncStorage.setItem(key, value);
    return response;
  } catch (error) {
    console.log('[saveItem] error saving', key, value, error);
  }
}

export async function removeItem(key) {
  try {
    let response = await AsyncStorage.removeItem(key);
    return response;
  } catch (error) {
    console.log('[removeToken] error removing token', error);
  }
}