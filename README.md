## Barnabas

A Kafka messenger

### Description

Barnabas simplifies Kafka usage during development by exposing a web interface which is translated to Kafka messages.

### Usage

#### Configuration

Configure the app using the following environment variables:

``BROKERS`` Required. A string with a list of brokers separated by a comma (e.g. 'broker-01:9092,broker-02:9092').

``TOPICS`` Required. A string with a list of topics separated by a comma (e.g. 'topic-one,topic-two').

``CLIENT_ID`` Optional. Uses 'barnabas' by default .

``GROUP_ID`` Optional. Uses 'barnabas-group' with a random unique hash by default. (e.g. 'barnabas-group-9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d').

``PORT`` Optional. Uses 29092 by default.

``SSL`` Optional. Set to false by default.

When ssl is true, the following credentials are required. Each must be added inside quotes (e.g. '"---- BEGIN CERTIFICATE----\r\nBP3qM\r\nG0R7M\r\n----END CERTIFICATE----"'):

``SSL_CA``

``SSL_KEY``

``SSL_CERT``

#### Local

Start the app by running the following command:
```
npm start
```

#### Docker

Build and run the image by running the following command:
```
docker run -d -p 29092:29092 sombreroron/barnabas
```

#### Docker Compose

Create a docker-compose.yml file:<br />
[docker-compose.example.yml](./docker-compose.example.yml)

Run the following command:
```
docker-compose up -d
```

### API

#### Send Message

``/:topic (POST)``

Send a message to a topic. Payload is used as the message content.

#### Example
```
POST http://localhost:29092/my-topic

{
    "foo": "bar"
}
```

#### Get Messages

``/:topic (GET)``

Returns a list of messages that were sent to a topic. 

The request body can be used as a query to filter the messages. A body is used with a GET request for ease of use. 

Messages are retrieved from the latest offset by default. This can be changed by settings the ``OFFSET_RESET`` environment variable.

#### Example
```
GET  http://localhost:29092/my-topic

{
    "foo.bar": "baz",
    "foo": "bar"
}
```
