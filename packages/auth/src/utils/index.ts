import crypto = require('crypto');
import { default as Random } from './random';
import { getSteedosSchema } from '@steedos/objectql';
const Cookies = require('cookies');

export const hashLoginToken = function (loginToken) {
  const hash = crypto.createHash('sha256');
  hash.update(loginToken);
  return hash.digest('base64');
}

export const generateStampedLoginToken = function () {
  return {
    token: Random.secret(),
    when: new Date
  };
}

export const hashStampedToken = function (stampedToken) {
  const hashedStampedToken = Object.keys(stampedToken).reduce(
    (prev, key) => key === 'token' ?
      prev :
      { ...prev, [key]: stampedToken[key] },
    {},
  )
  return {
    ...hashedStampedToken,
    hashedToken: hashLoginToken(stampedToken.token)
  };
}

export const insertHashedLoginToken = async function (userId, hashedToken) {
  let userObject = getSteedosSchema().getObject('users')
  let user = await userObject.findOne(userId, { fields: ['services'] })
  if(!user['services']){
    user['services'] = {}
  }
  if(!user['services']['resume']){
    user['services']['resume'] = {loginTokens: []}
  }
  user['services']['resume']['loginTokens'].push(hashedToken)
  let data = { services: user['services'] }
  return await userObject.update(userId, data);
}



export const setAuthCookies = function (req, res, userId, authToken, spaceId?) {
  let cookies = new Cookies(req, res);
  let options = {
    maxAge: 90 * 60 * 60 * 24 * 1000,
    httpOnly: true,
    overwrite: true
  }
  cookies.set("X-User-Id", userId, options);
  cookies.set("X-Auth-Token", authToken, options);
  if (spaceId) {
    cookies.set("X-Space-Id", spaceId, options);
    // cookies.set("X-Space-Token", spaceId + ',' + authToken, options);
  }

  return;
}


export const clearAuthCookies = function (req, res) {
  let cookies = new Cookies(req, res);
  let options = {
    maxAge: 0,
    httpOnly: true,
    overwrite: true
  }
  cookies.set("X-User-Id", null, options);
  cookies.set("X-Auth-Token", null, options);
  cookies.set("X-Access-Token", null, options);
  cookies.set("X-Space-Token", null, options);
  return;
}

export function isExpried(expiredAt: number) {
  return expiredAt <= new Date().getTime();
}