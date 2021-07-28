## Barnabas

A Kafka messenger

### Description

Barnabas simplifies Kafka usage during development by exposing a web interface which is translated to Kafka messages.&ast;

### API

#### Send Message

``/:topic (POST)``

Send message to a topic. Payload is used as the message content.

#### Example
```
POST http://localhost:9999/my-topic

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
GET  http://localhost:9999/my-topic

{
    "foo.bar": "baz",
    "foo": "bar"
}
```
