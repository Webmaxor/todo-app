# TODO App onboarding

## Backend

Assuming you have installed the following on your device:

- Node
- Postgresql

### Initializing the database

Create a role:

```
psql postgres << EOF
 CREATE ROLE pguser WITH LOGIN PASSWORD 'password';
 ALTER ROLE pguser CREATEDB;
EOF
```

Log in with the new role and create a database:

```
psql -d postgres -U pguser << EOF
  CREATE DATABASE todoapp;
EOF
```

#### Install sequelize globally to use sequelize-cli

`yarn global add sequelize`

### Run backend app

- Go to `./backend` directory
- Run `yarn` or `npm install`
- Run `sequelize db:migrate` to migrate Todos and Subtasks schema
- Run `yarn dev`

If everything go smoothly, it starts http server on 3000 port.
