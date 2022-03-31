#!/bin/bash

read -p "请输入git commit消息：" msg

git add .

git commit -m $msg

git push origin master

git push github master