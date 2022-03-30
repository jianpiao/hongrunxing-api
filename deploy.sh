#!/bin/bas

containerName="hongrunxing-api"

docker inspect -f '{{.Name}}' $containerName

if [ $? ==0 ];
then
    echo "hongrunxing-api容器已存在"
    docker container stop $containerName
    docker container rm $containerName
    docker rmi $containerName
else
    echo "容器不存在，开始执行构建"
fi

docker build -t hongrunxing-api .

docker run -d -p 7001:7001 --name hongrunxing-api hongrunxing-api