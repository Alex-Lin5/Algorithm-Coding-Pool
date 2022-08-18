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

## Docker usage
- `docker run -it 'ID' sh`, interact the container with shell
- `docker-compose up --build`, rebuild and start up the docker services

## Bugs
- Response can not access to array object in `supertest 6.2.4`, `question.test.js`
https://github.com/visionmedia/supertest/issues/783
- **PUT** operation can not get correct result from request in `solution.test.js`
https://stackoverflow.com/questions/73381653/cannot-get-correct-result-from-put-operation-via-npm-supertest-in-jest