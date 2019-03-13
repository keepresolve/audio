FROM node
# RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
# RUN npm install pm2 -g --registry=https://registry.npm.taobao.org
RUN mkdir /app
WORKDIR /app
RUN  apt-get update
RUN  add-apt-repository ppa:openjdk-r/ppa
RUN  apt-get update
RUN   apt-get install openjdk-8-jdk
COPY package.json /app
RUN  npm install  && mv node_modules ../
#RUN npm install --production --silent && mv node_modules ../
COPY . /app
EXPOSE 8000
CMD ["npm", "start"]
# CMD ["pm2-docker", "bin/www"]