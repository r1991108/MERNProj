# MERNProj
a practice for MERN project

# Getting start
## clone the project source
$ `git clone https://github.com/r1991108/MERNProj.git`
## install modules that are required for running the project
$ `cd ~MERNProj/`
$ `npm install`
$ `cd server/`
$ `npm install`
$ `cd ../client/`
$ `npm install`
## Run the project
$ `cd ~MERNProj/`
$ `npm run dev`

## Docker Development run
If you would like to run the development tools inside of a docker container, you can set up a local Docker development environment by building the image:
*besure to delete node_modules under ./server before you doing the following step or it will possibly fail
## build image
$ `cd ~MERNProj/`
$ `docker build -t test/mern .`

## run the image:
$ `docker run -it -p 8080:8080 -p 3000:3000 test/mern:latest`
