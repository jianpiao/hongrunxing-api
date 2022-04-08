# FROM node:14 AS build

# WORKDIR /app

# COPY . .

# RUN npm install

# RUN npm run build

# FROM node:14-alpine

# WORKDIR /app

# COPY --from=build /app/dist ./dist
# COPY --from=build /app/bootstrap.js ./
# COPY --from=build /app/package.json ./

# RUN apk add --no-cache tzdata

# ENV TZ="Asia/Shanghai"

# RUN npm install --production

# RUN npm install pm2 -g

# # 如果端口更换，这边可以更新一下
# EXPOSE 7001

# CMD ["npm", "run", "start"]


FROM node:14-alpine

WORKDIR /app

ENV TZ="Asia/Shanghai"

COPY . .

# 如果各公司有自己的私有源，可以替换registry地址
RUN npm install --registry=https://registry.npm.taobao.org

#RUN npm install pm2 -g

RUN npm run build

# 如果端口更换，这边可以更新一下
EXPOSE 7001

CMD ["npm", "run", "start"]