#!/bin/bas

containerName="hongrunxing-api"

docker inspect -f '{{.Name}}' $containerName

echo "搜索结果：$?"

if [ $? == 0 ];
then
    echo "hongrunxing-api容器已存在"
    docker container stop hongrunxing-api
    docker container rm hongrunxing-api
    docker rmi hongrunxing-api node:14-alpine node:14
else
    echo "hongrunxing-api容器不存在，开始执行构建"
fi

docker build -t hongrunxing-api .

docker run -d -p 7001:7001 --name hongrunxing-api hongrunxing-api

# 删除不用等容器和镜像

docker container prune -f

docker image prune -a -f