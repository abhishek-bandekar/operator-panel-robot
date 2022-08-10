'use strict';
export function logout() {
  // console.log('logout function called')
  delete localStorage.aisplopdata
  location.href = 'login.html'
  // if (location.pathname == '/operator/') location.href = '../operator/login.html';
  // else location.href = '../vapl-op-panel/login.html';
}
window.logout = logout;
export async function apiUrlCall(type, url, data = null) {
  // console.log('type', type, 'url', url, 'data', data)
  // await reviewToken()
  if (type == "POST" || type == "PUT") {
    return await $.ajax({
      type, url, data: JSON.stringify(data), headers: { "Authorization": "Bearer " + aisplopdata.token },
      dataType: 'json', contentType: 'application/json',
      success: async result => {
        // console.log(`${url} result`, result)
        return result
      },
      error: (error) => {
        if (error && error.responseJSON && error.responseJSON.message == 'Unauthorized') logout()
        if (error && error.responseJSON) console.log(error.responseJSON)
        else if (error && error.responseText) console.log(error.responseText)
        else console.log({ error })
        console.error('error', error)
      }
    });
  } else {
    return await $.ajax({
      type, url, data, headers: { "Authorization": "Bearer " + aisplopdata.token },
      contentType: 'application/json',
      success: async result => {
        return result
      },
      error: (error) => {
        if (error && error.responseJSON && error.responseJSON.message == 'Unauthorized') logout()
        if (error && error.responseJSON) console.log(error.responseJSON)
        else if (error && error.responseText) console.log(error.responseText)
        else console.log({ error, url, data })
        throw error
      }
    });
  }
}
export async function apiUrlCallback(type, url, data = null, callback = null) {
  // console.log('type', type, 'url', url, 'data', data)
  await reviewToken()
  if (type == "POST" || type == "PUT") {
    return await $.ajax({
      type, url, data: JSON.stringify(data), headers: { "Authorization": "Bearer " + aisplopdata.token },
      dataType: 'json', contentType: 'application/json',
      success: async result => {
        // console.log(`${url} result`, result)
        callback(result);
      },
      error: (error) => {
        if (error && error.responseJSON && error.responseJSON.message == 'Unauthorized') logout()
        if (error && error.responseJSON) console.log(error.responseJSON)
        else if (error && error.responseText) console.log(error.responseText)
        else console.log({ error })
        console.error('error', error)
      }
    });
  } else {
    return await $.ajax({
      type, url, data, headers: { "Authorization": "Bearer " + aisplopdata.token },
      dataType: 'json', contentType: 'application/json',
      success: async result => {
        // console.log(`${url} result`, result)
        callback(result)
      },
      error: (error) => {
        if (error && error.responseJSON && error.responseJSON.message == 'Unauthorized') logout()
        if (error && error.responseJSON) console.log(error.responseJSON)
        else if (error && error.responseText) console.log(error.responseText)
        else console.log({ error })
        throw error
      }
    });
  }
}
export async function reviewToken() {
  await new Promise(async resolve => {
    try {
      // setTimeout(() => { resolve(2); }, delayInms);
      // console.log(Math.round(Date.now() / 1000), ' >= ', aisplopdata.tokenExpires, '. . . <br/>')
      if (aisplopdata.tokenExpires && Math.round(Date.now() / 1000) >= aisplopdata.tokenExpires) {
        let postdata = { refreshToken: aisplopdata.refreshToken }
        await $.ajax({
          url: apiUrl + 'auth/refresh-token',
          data: JSON.stringify(postdata),
          headers: { "Authorization": "Bearer " + aisplopdata.token },
          type: "POST",
          dataType: 'json',
          contentType: 'application/json',
          success: async data => {
            // console.log('auth/refresh-token data', data)
            let newAisplopdata = {
              clientId: data.clientId,
              fullname: data.fullname,
              username: data.username,
              email: data.email,
              token: data.token,
              tokenExpires: data.tokenExpires,
              locations: data.locations,
              plants: data.plants,
              divisions: data.divisions,
              refreshToken: data.refreshToken
            }
            localStorage.setItem('token', data.token)
            localStorage.setItem('clientId', data.clientId)
            aisplopdata.tokenExpires = data.tokenExpires
            aisplopdata.token = data.token
            aisplopdata.refreshToken = data.refreshToken
            await localStorage.setItem('aisplopdata', JSON.stringify(newAisplopdata))
            resolve(true)
          },
          error: (error) => {
            console.log('auth/refresh-token error', error)
            if (error && error.responseJSON && error.responseJSON.message == 'Unauthorized') logout()
            if (error && error.responseJSON) console.log('error.responseJSON', error.responseJSON)
            resolve(false)
            logout()
          }
        })
      } else {
        resolve(true)
      }
    } catch (error) {
      console.log('reviewToken error', error)
      resolve(false)
      logout()
    }
  });
}
