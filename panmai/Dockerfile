FROM node
# RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
ENV NODE_ENV production
# RUN npm install pm2 -g --registry=https://registry.npm.taobao.org
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --registry=https://registry.npm.taobao.org && mv node_modules ../
#RUN npm install --production --silent && mv node_modules ../
COPY . /app
EXPOSE 8000
EXPOSE 3001
CMD ["npm", "start"]
# CMD ["pm2-docker", "bin/www"]