- main service `npm run start`
- queue service `npm run queue`

# MERN Video Streaming Project

## Overview
A state-of-the-art, open-source video streaming platform, MERN Video Streaming provides a full-stack, comprehensive solution that makes use of the newest MERN stack technologies. Users can effortlessly upload, organize, and stream videos on demand with MERN Video Streaming, offering a smooth experience. This project has the capacity to process videos and send out notifications in real time when it is finished. 

The backend consists of three services that communicate with each other via Redis messaging. These consist of an HTTP server that serves HLS video files, an API server, and a video conversion service. The project's client employs the create-react-app and MUI libraries, as well as socket.io-client and React Context.

## Architecture

### Backend Services

#### API Server

An Expressjs application called the API server makes use of the Joi, Multer, BullMQ, Socket.io, and MongoDB drivers. The primary database on the server is MongoDB, which is used in conjunction with Redis for data processing and storage. The docker-compose command spins up the database and Redis.

#### Video Conversion Service

The video conversion service is a node process that uses the BullMQ library to communicate with Redis and convert videos. There are no HTTP ports open to the service.
#### HTTP Server

The HTTP server is a plain and simple server that serves HLS video files.

## Prerequisites

To get started with MERN Video Streaming, you will need to have the following
software installed on your local machine:

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Built with Open-Source Technologies

MERN Video Streaming has been built with the following open-source technologies:

- [MongoDB](https://www.mongodb.com/) - A document-based database used to store
  user and video data
- [Express](https://expressjs.com/) - A Node.js web application framework used
  for the server-side of the application
- [React](https://reactjs.org/) - A JavaScript library for building user
  interfaces used for the client-side of the application
- [Node.js](https://nodejs.org/en/) - A JavaScript runtime environment used to
  run the server-side code
