### 登录私库
`docker login registry.cloud.saas.hand-china.com`

#### 查看已有镜像
`docker images`

#### 打包
`sudo docker build -t="hmap-wechat:2019072601" .`

#### 打tag
`sudo docker tag 500caddfcaad registry.cloud.saas.hand-china.com/hcf/wechat-work-dev:1.4.0-2019072601`

####push
`sudo docker push registry.cloud.saas.hand-china.com/hcf/wechat-work-dev:1.4.0-2019072601`