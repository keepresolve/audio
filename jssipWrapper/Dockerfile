FROM node
RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --registry=https://registry.npm.taobao.org
COPY . /app
EXPOSE 9000
CMD ["npm", "run", "toolbar"]