# DRAG AND DROP ITEMS

## Prerequisites
- Docker

Everything else will be pulled from Docker/Npm repositories !

Getting Started
---------------
```
# clone repository
# using SSH
$ git clone git@github.com:mateosilguero/dnd-test.git
# or using HTTPS
$ https://github.com/mateosilguero/dnd-test.git
# then
$ cd dnd
```

Install dependencies

```
# this command will run 'npm install' inside server folder
$ docker-compose run --rm --no-deps node bash -ci 'npm install'
```

Run your app

```
# run your app (you can stop it with CTRL+C)
$ docker-compose up

# go to:
* localhost:4567/app (client)
* localhost:4567/api/v1 (api)
* localhost:4567/api/v1/docs (api docs)

# kill containers (DB data will be lost)
$ docker-compose down
```
