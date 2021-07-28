FROM node:14-alpine

#create /var/app dir
RUN mkdir -p /var/app

# change to appdir
WORKDIR /var/app

# copy package.json
ADD ./package.json ./

# install dependencies
RUN npm install

# build code
RUN npm run build

# remove devDependencies
RUN npm prune --production

# start command
CMD [ "npm", "run", "start:prod" ]
