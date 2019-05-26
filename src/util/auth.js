const TokenKey = 'User-Token';
const RoleKey = 'User-Role';
const UserInfoKey = 'User-Info';

export function setToken(token) {
  localStorage.setItem(TokenKey, token);
}

export function setRole(role) {
  localStorage.setItem(RoleKey, role);
}

export function setUserInfo(userInfo) {
  localStorage.setItem(UserInfoKey, userInfo);
}

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function getRole() {
  return localStorage.getItem(RoleKey);
}

export function getUserInfo() {
  return localStorage.getItem(UserInfoKey);
}

export function removeAll() {
  localStorage.clear();
}

/**
 * 根据需要的角色，判断用户是否拥有权限
 * @param roles 需要的角色 list
 * @returns {boolean} true 有权限， false 无权限
 */
export function checkHaveAuthByRequireRoles(roles) {
  const userRoles = getRole();
  return userRoles && !!roles.find(role => userRoles.indexOf(role) !== -1);
}
