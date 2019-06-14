const TokenKey = 'User-Token';
const UserInfoKey = 'User-Info';

export function setToken(token) {
  localStorage.setItem(TokenKey, token);
}

export function setUserInfo(userInfo) {
  localStorage.setItem(UserInfoKey, userInfo);
}

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function getUserInfo() {
  return localStorage.getItem(UserInfoKey);
}

export function removeAll() {
  localStorage.clear();
}
