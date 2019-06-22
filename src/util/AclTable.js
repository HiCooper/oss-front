const AclTable = {
  EXTEND_BUCKET: '继承 Bucket',
  PRIVATE: '私有',
  PUBLIC_READ: '公共读',
  PUBLIC_READ_WRITE: '公共读写',
};

/**
 * 获取 读写权限描述
 * @param acl
 * @returns {*}
 */
export function getAclDesc(acl) {
  return AclTable[acl];
}
