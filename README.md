# Algorithm-Coding-Pool
A website that collect my answer to Algorithm coding problems

## Modeling
default object is mongoose model, `&` is reference to mongoose schema objectID, `[]` is array object
|Root|||||
|:-:|:-:|:-:|:-:|:-:|
|→|answer|-|content|||
|→|code|-|content||
|||-|language|
|||-|result|
|||-|performance|
|→|description|-|title|
|||-|brief|
|||-|serialNum|
|||-|solved|
|||-|difficulty|
|→|solution|-|& answer|
|||-|& code|
|→|question|-|solutions: [& solution]|
|||-|& description|

## Environment declaration
### For Windows powershell
- `echo $env:NODE_ENV`, to get the value
- `$env:NODE_ENV="production"`, to set a value
## Docker usage
- `docker run -it 'ID' sh`, interact the container with shell
- `docker-compose up --build`, rebuild and start up the docker services

## Note
### Mongo ObjectID
The 12-byte ObjectId consists of:
- A 4-byte timestamp, representing the ObjectId's creation, measured in seconds since the Unix epoch.
- A 5-byte random value generated once per process. This random value is unique to the machine and process.
- A 3-byte incrementing counter, initialized to a random value.

While the BSON format itself is little-endian, the timestamp and counter values are big-endian, the most significant bytes appear first in the byte sequence.

If an integer value is used to create an ObjectId, the integer replaces the timestamp.

https://www.mongodb.com/docs/manual/reference/method/ObjectId/

## Bugs
