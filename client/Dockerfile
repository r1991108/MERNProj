# Base Image - ubuntu latest
FROM node:16.13.0

# Copy Workdir contents
ADD . /client/
WORKDIR /client/

# Create a Build
RUN npm install

# Runtime App
CMD npm run start
