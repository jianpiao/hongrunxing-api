#!/bin/bas

containerName="hongrunxing-api"

docker inspect -f '{{.Name}}' containerName

echo "搜索结果：$?"

if [ $? == 0 ];
then
    echo "hongrunxing-api容器已存在"
    docker container stop containerName
    docker container rm containerName
    docker rmi containerName node:14-alpine node:14
else
    echo "$containerName容器不存在，开始执行构建"
fi

docker build -t hongrunxing-api .

docker run -d -p 7001:7001 --name hongrunxing-api hongrunxing-api