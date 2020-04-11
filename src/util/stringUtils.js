/**
 * 获取url参数
 * @param url
 */
export function getParamsFromUrl(url) {
  if (!url || url.length === 0 || url.indexOf('?') === -1) {
    return null;
  }
  const paramsStr = url.substr(url.indexOf('?') + 1)
    .split('&');
  const params = {};
  paramsStr.forEach((i) => {
    const strings = i.split('=');
    params[strings[0]] = strings[1];
  });
  return params;
}

export function getPathnameFromUrl(url) {
  if (!url || url.length === 0 || url.indexOf('?') === -1) {
    return url;
  }
  return url.substr(0, url.indexOf('?'));
}

export function paramsToUrl(params) {
  let result = '';
  const keys = Object.keys(params);
  const length = keys.length;
  Object.keys(params)
    .forEach((i, index) => {
      result += `${i}=${params[i]}`;
      if (index < length - 1) {
        result += '&';
      }
    });
  return result;
}

/**
 * 检查参数，如果任何一个value 为零值[ undefined, '', {}, [], null ] 则返回false
 * @param params 可以是基本类型，列表 或对象
 * @param ignoreKeys 忽略检查的属性 列表 like ['name']
 * @returns {boolean}
 */
export function checkParams(params, ignoreKeys) {
  let result = true;
  if (typeof params === 'string' || (typeof params === 'number' && params !== 0) || (typeof params === 'boolean' && params !== false)) {
    return !!params;
  }
  if (params === undefined || JSON.stringify(params) === '{}') {
    result = false;
  } else if (Array.isArray(params)) {
    if (params.length === 0) {
      result = false;
    } else {
      Object.values(params)
        .every((value) => {
          result = checkParams(value, ignoreKeys);
          return result;
        });
    }
  } else if (typeof params === 'object') {
    Object.entries(params)
      .every((entry) => {
        if (!ignoreKeys || !ignoreKeys.find(v => v === entry[0])) {
          result = checkParams(entry[1], ignoreKeys);
        }
        return result;
      });
  }
  return result;
}

/**
 * 根据文件名，获取svg图标名
 * @param record
 * @returns {string}
 */
export function getIconByFileName(record) {
  if (record.isDir) {
    return 'folder';
  }
  const fileName = record.fileName.toLowerCase();
  // 图片
  if (fileName.endsWith('.jpg')
    || fileName.endsWith('.jpeg')
    || fileName.endsWith('.svg')
    || fileName.endsWith('.png')
    || fileName.endsWith('.bmg')
    || fileName.endsWith('.gif')) {
    return 'icon-file-image-o';
  }
  //  办公文档
  if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
    return 'icon-file-excel--line';
  }
  if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
    return 'icon-file-word--line';
  }
  if (fileName.endsWith('.ppt') || fileName.endsWith('.pptx')) {
    return 'icon-file-ppt--line';
  }
  if (fileName.endsWith('.pdf')) {
    return 'icon-file-pdf';
  }
  if (fileName.endsWith('.md')) {
    return 'icon-file-markdown';
  }
  if (fileName.endsWith('.zip')) {
    return 'icon-file-zip';
  }
  if (fileName.endsWith('.txt')) {
    return 'icon-file-text';
  }
  if (fileName.endsWith('.mp4')) {
    return 'icon-file-video';
  }
  return 'icon-file-unknown';
}

/**
 * 过滤对象中的null值 key
 * @param object
 */
export function filterNonNullValue(object) {
  const temp = {};
  Object.keys(object)
    .forEach((v) => {
      if (object[v] !== undefined && object[v] !== '' && object[v] !== null) {
        temp[v] = object[v];
      }
    });
  return temp;
}


/**
 * 获取格式化文件大小
 * @param size
 * @returns {string}
 */
export function formatFileSize(size) {
  if (!size || typeof size !== 'number') {
    return '0KB';
  }
  const MAGIC_NUM = 1024;
  const KB = size / MAGIC_NUM;
  if (KB <= MAGIC_NUM) {
    return `${KB.toFixed(2)}KB`;
  }
  const MB = KB / MAGIC_NUM;
  if (MB <= MAGIC_NUM) {
    return `${MB.toFixed(2)}MB`;
  }
  const GB = MB / MAGIC_NUM;
  if (GB <= MAGIC_NUM) {
    return `${GB.toFixed(2)}GB`;
  }
  throw new Error('File size too Big!!!');
}
