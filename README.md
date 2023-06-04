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

## Environment

### Configuration
- Docker compose file set up **NODE_ENV** variable value in containers
- database directory is refered from `/config/*.json` file

## Mongo Service
Type `mongo` in terminal to enter mongodb shell
- `show dbs`, list all databases in current connection
- `db`, return current working database
- `use pool`, change current working database to **pool**
- `show collections`, list all collections in current working database
- `db.collection.find()`, list all items in this **collection**
- More CRUD operations can be found in mongoDB manual
- https://www.mongodb.com/docs/mongodb-shell/run-commands/
## Note
### Environment Variable Declaration
For Windows powershell
- `echo $env:NODE_ENV`, to get the value
- `$env:NODE_ENV="production"`, to set a value
### Docker usage
- `docker exec -it 'ID' sh`, interact the container of specific ID with shell
- `docker-compose up --build`, rebuild and start up the docker services
### NPM package management
- `npm outdated`, list all packages available to update
- `npm update`, updates all packages available to update
- `npm i -g npm-check-updates`, globally install ncu package to manege update
  - `ncu -u`, upgrade all packages in repository to latest version

### Mongo ObjectID
The 12-byte ObjectId consists of:
- A 4-byte timestamp, representing the ObjectId's creation, measured in seconds since the Unix epoch.
- A 5-byte random value generated once per process. This random value is unique to the machine and process.
- A 3-byte incrementing counter, initialized to a random value.

While the BSON format itself is little-endian, the timestamp and counter values are big-endian, the most significant bytes appear first in the byte sequence.

If an integer value is used to create an ObjectId, the integer replaces the timestamp.

https://www.mongodb.com/docs/manual/reference/method/ObjectId/

## Bugs
- Middleware authorization test failed on 401 and 400. Invalid token or null token does not fail the authorization process as getting user profile. Auth middleware is injected in user routing for `GET /me/:id` http request.
