#FROM 769325152790.dkr.ecr.us-west-2.amazonaws.com/nodejs:nodejs-16.14.2
FROM node:current-alpine3.15
RUN apk update
RUN apk add --no-cache --virtual git yarn curl

# Only include the files that are necessary for the application, always double check
# the .dockerignore file prior to running docker build
WORKDIR /usr/src/app
COPY . .

# Trigger the run commands
RUN yarn install
RUN yarn run build


CMD [ "yarn", "run", "serve"]
