# Files Converter

### 🔨 About the Project 

> (application under development, the description below refers to the target state.)

**Files Converter** is a scalable application based on a microservice architecture that allows, through a simple graphical interface, to compress files, change their format, resolution, crop them, and, after processing, return them as a single ZIP file or as multiple files if the package size exceeds 16 GB. It also offers the ability to generate an image or convert audio to text using [**AI**](https://ollama.com/). All files are available for 7 days for a basic user and for 30 days for a premium user. After this period, a scheduler automatically deletes them. Access to the files, their metadata, and account statistics is provided through a [**GraphQL**](https://graphql.org/) API.

### 🚀 Getting Started

Follow these steps to get the project up and running locally:

#### 1. Clone the Repository

```bash
git clone https://github.com/Mathsqrt2/AI_Talks.git
```

#### 2. Environment Variable Configuration

The application includes default environmental settings for basic functionality.
However, if you want anything else for any purpose, you can 
configure these everything in a [.env](./backend/.env.d.ts) file.

#### 3. Build Docker Container

Make sure Docker is installed, then run:

```bash
docker compose -f docker/docker-compose.yml --profile prod up -d -V --build
```

### 📄 Documentation

All available functionalities and system behavior are described in the [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/v2/testing/graphql-playground) documentation.
It provides a user-friendly interface to explore and test API endpoints directly from the browser.
You can check available routes, required parameters, and expected responses.
The documentation is automatically generated and accessible at:

```http
GET http://localhost:13000/api/v1/graphql
```

---

### 📄 Features

* Conversion of files to various alternative formats, for example: wav → mp3, mkv → mp4, png → jpg, etc.
* Application settings control via the GraphQL API, allowing you to start processes, retrieve statistical data, and exchange communication with the service
* File storage in MinIO, a system based on the Amazon S3 API, enabling blob storage in buckets
* A panel that allows drag-and-drop uploading of multiple files, and then configuring what should happen to each of them
* A panel for the user’s uploaded files, showing their current status, time remaining until deletion, and the option to generate a sharing link
* Image generation and audio-to-text conversion using AI
* Authentication using the JSON Web Token mechanism

---

### 🛠️ Tech Stack

* [**NestJS**](https://nestjs.com/) – Node.js framework for scalable backend applications.
* [**TypeScript**](https://www.typescriptlang.org/) – Strongly-typed superset of JavaScript.
* [**PostgreSQL**](https://www.postgresql.org/) – Popular open-source relational database.
* [**TypeORM**](https://typeorm.io/) – Powerful ORM for database interactions in Node.js applications.
* [**Docker**](https://www.docker.com/) – Tool for containerizing applications and their dependencies.
* [**RabbitMQ**](https://www.rabbitmq.com/) – Message broker enabling application scaling through microservices.
* [**GraphQL**](https://graphql.org/) – Query language based on graphs instead of tables.
* [**MinIO**](https://www.min.io/) – Open-source, Amazon S3-compatible tool for data storage.
* [**Vue**](https://vuejs.org/) – Framework for building efficient application interfaces.

---


### 📌 License

This project is available under the MIT License. For more details, see the [LICENSE](LICENSE) file.
