const { override, fixBabelImports, addLessLoader } = require('customize-cra');

// process.env.PUBLIC_URL = '/oss-front';
// 关闭 sourceMap
process.env.GENERATE_SOURCEMAP = 'false';
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#574ab7' },
  }),
);
