# Base Image - ubuntu latest
FROM node:16.13.0

# Copy Workdir contents
ADD . /server/
WORKDIR /server/

# Create a Build
RUN npm install
RUN npm install bcrypt --silent

# Runtime App
CMD npm run dev_server
