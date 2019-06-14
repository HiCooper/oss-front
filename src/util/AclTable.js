const AclTable = {
  PRIVATE: '私有',
  PUBLIC_READ: '公开读',
  PUBLIC: '公开',
};

/**
 * 获取 读写权限描述
 * @param acl
 * @returns {*}
 */
export function getAclDesc(acl) {
  return AclTable[acl];
}
