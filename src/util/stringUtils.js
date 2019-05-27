/**
 * 获取url参数
 * @param url
 */
export function getParamsFromUrl(url) {
  if (!url || url.length === 0 || url.indexOf('?') === -1) {
    return {};
  }
  const paramsStr = url.substr(url.indexOf('?') + 1).split('&');
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
  Object.keys(params).forEach((i, index) => {
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
  } if (params === undefined || JSON.stringify(params) === '{}') {
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
 * @param fileName
 * @returns {string}
 */
export function getIconByFileName(fileName) {
  fileName = fileName.toLowerCase();
  // 图片
  if (fileName.endsWith('.jpg')) {
    return 'file-image';
  }
  if (fileName.endsWith('.jpeg')) {
    return 'file-image';
  }
  if (fileName.endsWith('.png')) {
    return 'picture';
  }
  if (fileName.endsWith('.svg')) {
    return 'picture';
  }
  if (fileName.endsWith('.bmg')) {
    return 'picture';
  }
  if (fileName.endsWith('.gif')) {
    return 'picture';
    //  办公文档
  }
  if (fileName.endsWith('.xls')) {
    return 'file-excel';
  }
  if (fileName.endsWith('.xlsx')) {
    return 'file-excel';
  }
  if (fileName.endsWith('.doc')) {
    return '#iconfile_img1';
  }
  if (fileName.endsWith('.docx')) {
    return '#iconfile_img1';
  }
  if (fileName.endsWith('.ppt')) {
    return 'file-ppt';
  }
  if (fileName.endsWith('.pptx')) {
    return 'file-ppt';
  }
  if (fileName.endsWith('.pdf')) {
    return 'file-pdf';
    // 程序文件
  }
  if (fileName.endsWith('.json')) {
    return '#iconfile_img1';
  }
  if (fileName.endsWith('.yml')) {
    return '#iconfile_img1';
  }
  if (fileName.endsWith('.js')) {
    return '#iconfile_img1';
  }
  if (fileName.endsWith('.html')) {
    return '#iconfile_img1';
  }
  if (fileName.endsWith('.css')) {
    return '#iconfile_img1';
  }
  if (fileName.endsWith('.scss')) {
    return '#iconfile_img1';
  }
  if (fileName.endsWith('.less')) {
    return '#iconfile_img1';
  }
  if (fileName.endsWith('.md')) {
    return '#iconfile_img1';
  }
  if (fileName.endsWith('.jsx')) {
    return '#iconfile_img1';
  }
  return '#iconfile-b-3';
}

/**
 * 过滤对象中的null值 key
 * @param object
 */
export function filterNonNullValue(object) {
  const temp = {};
  Object.keys(object).forEach((v) => {
    if (object[v] !== undefined && object[v] !== '' && object[v] !== null) {
      temp[v] = object[v];
    }
  });
  return temp;
}
