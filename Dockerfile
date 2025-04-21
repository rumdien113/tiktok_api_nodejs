# Declare nodejs version
FROM node:23.9.0 

WORKDIR /app

# COPY file package.json & package-lock.json to ./
COPY package*.json ./

# install project's dependencies
RUN npm install

# copy all source code in container
COPY . .

# build app
RUN npm run build

# open port 3000 so that container can recive connections from outside
EXPOSE 3000

# run app with index file in folder dist 
CMD ["node", "dist/index.js"]
