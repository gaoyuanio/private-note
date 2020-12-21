### 登录私库
`docker login registry.cloud.saas.hand-china.com`

#### 查看已有镜像
`docker images`

#### 打包
`sudo docker build -t="hmap-wechat:gy2019090301" .`

#### 打tag
`sudo docker tag b23952065c74 registry.cloud.saas.hand-china.com/hcf/wechat-work-dev:1.4.0-gy2019090301`

####push
`sudo docker push registry.cloud.saas.hand-china.com/hcf/wechat-work-dev:1.4.0-gy2019090301`