# coffeelog

an app built to keep track of my coffee experiences, built with react expo and a node + apollo server (graphql) backend with sequelize and postgresSQL

## prerequisites

- install [mise](https://mise.jdx.dev) which installs and pins node and pnpm version
- docker desktop for running local postgres instance
- Xcode (ios sim) or run with expo go on your phone

## set up

```sh
mise install
pnpm install
pnpm --dir api install
pnpm --dir app install
cp api/.env.example api/.env
pnpm db:up # start local postgres in docker
pnpm --dir api db:migrate # create database tables
```

## how to run

run each in its own terminal at the root of this repo:

```sh
pnpm dev:api # runs docker compose up then runs dev server at http://localhost:4000
pnpm dev:app # runs expo server
```

## scripts

| Script                                            | What it does                  |
| ------------------------------------------------- | ----------------------------- |
| `pnpm dev:api`                                    | start postgres and the api    |
| `pnpm dev:app`                                    | start expo dev server         |
| `pnpm db:up` / `pnpm db:down`                     | start/stop postgres           |
| `pnpm lint`                                       | lint both projects with biome |
| `pnpm check`                                      | lint, format and sort imports |
| `pnpm --dir api db:migrate`                       | run pending migrations        |
| `pnpm --dir api db:migrate:undo`                  | revert last migration         |
| `pnpm --dir api db:migrate:status`                | list pending migrations       |
| `pnpm --dir api db:migrate:create --name name.ts` | create a new migration file   |
