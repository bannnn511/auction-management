#Specify a base image
FROM node:alpine

#Specify a working directory
WORKDIR /usr/app

#Copy the dependencies file
COPY ./package.json ./

#Install dependencies
#RUN npm install 

#Copy remaining files
COPY ./ ./

RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm rebuild bcrypt --build-from-source
RUN npm install -g nodemon

#Default command
CMD ["npm","start"]
