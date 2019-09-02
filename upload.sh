#!/usr/bin/env bash
export LANG="en_US.UTF-8"

#----------------------------------------------------------------------
# 常量配置信息
#----------------------------------------------------------------------

# 远程服务器 ip
remote_server_ip='10.50.12.38'
username='root'
# !确保远程文件夹存在
store_dir='/home/jar-service/oss/front'

#----------------------------------------------------------------------
# 脚本
#----------------------------------------------------------------------

echo '清空旧文件...'
ssh ${username}@${remote_server_ip} rm -r ${store_dir}/*
echo "正在上传..."
#  cp run.sh build/libs/
scp -r build/* ${username}@${remote_server_ip}:${store_dir}
# shellcheck disable=SC2181
if [ $? != 0 ]; then
  echo "上传失败"
  exit 1
fi
echo "上传成功"
