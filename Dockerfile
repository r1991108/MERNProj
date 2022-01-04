# Base Image - ubuntu latest
FROM node:16.13.0

# Copy Workdir contents
ADD . /MERNProj/
WORKDIR /MERNProj/

# Create a Build
RUN npm install
RUN npm install --prefix server
RUN npm install bcrypt --silent --prefix server
RUN npm install --prefix client

# Runtime App
CMD npm run dev
