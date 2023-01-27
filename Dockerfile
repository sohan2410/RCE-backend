FROM node:18
WORKDIR /app
RUN apt-get update
RUN apt-get install openjdk-8-jdk -y
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]

