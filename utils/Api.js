import { getToken, saveToken } from './TokenUtils';

let uri = 'https://fe6d1775.ngrok.io/'

let headers = {
  'Accept': "application/json",
  "Content-Type": "application/json"
}


export async function register(obj) {
  console.log('register', obj)
  let url = uri + 'users/new/'
  console.log('url', url)

  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(obj)
    })

    console.log('response', response);

    if (response.status >= 200 && response.status < 300) {
      return true;
    } else {
      console.log('[register] bad response status');
    }
  } catch(error) {
    console.log('[register] error registering');
  }
}

export async function login(obj) {
  let url = uri + 'jwt-auth/'

  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(obj)
    })

    if (response.status >= 200 && response.status < 300) {
      let res = await response.json();
      await saveToken(res.token);
      return true;
    } else {
      console.log('[login] bad response status');
    }
  } catch(error) {
    console.log('[login] error logging in', error);
  }
}

export async function get(path) {
  try {
    let token = await getToken();

    if (token) {
      let url = uri + path;
      let payload = {
        method: 'get',
        headers: new Headers({
          'Authorization': `JWT ${token}`,
          ...headers,
        }),
      }
      let response = await fetch(url, payload)

      if (response.status >= 200 && response.status < 300) {
        return await response.json()
      } else {
        console.log('[get] bad response status')
      }
    } else {
      console.log('[get] no token');
    }
  } catch (error) {
    console.log('[get] error while performing', error);
  }
}