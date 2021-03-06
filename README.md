## Description
API para cadastro de estabelecimentos desenvolvida utilizando a técnica de TDD com as tecnologias: [NestJS](https://nestjs.com/), [Typescript](https://www.typescriptlang.org/), [PostgreSQL](https://www.postgresql.org/).

## Running the app

**Docker:**

```bash
$ docker-compose up -d
```


**Start Application:**

```bash
$ yarn start:dev
```

**OBS:**
Rode o arquivo `Script.sql` para cadastrar as categorias na ordem necessária para validações internas.

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

### API Documentation
Usar o arquivo `Insomnia.json` para disparar as requisições.

## License
Nest is [MIT licensed](LICENSE).
