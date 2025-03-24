<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# API de Gerenciamento de Pedidos

API REST desenvolvida com NestJS para gerenciamento de produtos e pedidos, utilizando PostgreSQL como banco de dados.

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/) - Framework Node.js para construção de aplicações escaláveis
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [TypeORM](https://typeorm.io/) - ORM para TypeScript
- [Swagger](https://swagger.io/) - Documentação da API
- [Docker](https://www.docker.com/) - Containerização da aplicação
- [Jest](https://jestjs.io/) - Framework de testes

## 📋 Pré-requisitos

- Node.js 20.x
- PostgreSQL 16.x
- Docker e Docker Compose (opcional)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/claude-sonnet-api.git
cd claude-sonnet-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Configure as variáveis no arquivo `.env`:
```env
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=theta_db

# Application
PORT=3000
NODE_ENV=development
```

## 🚀 Executando a aplicação

### Desenvolvimento local

1. Inicie o PostgreSQL:
```bash
docker-compose up postgres -d
```

2. Crie o banco de dados:
```bash
npm run db:create
```

3. Inicie a aplicação em modo desenvolvimento:
```bash
npm run start:dev
```

### Docker

1. Construa e inicie os containers:
```bash
npm run docker:build
npm run docker:up
```

2. Para desenvolvimento com hot-reload:
```bash
npm run docker:dev
```

## 📚 Documentação da API

A documentação da API está disponível através do Swagger UI em:
```
http://localhost:3000/docs
```

## 🧪 Testes

### Executando testes

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:cov

# Executar testes em modo watch
npm run test:watch

# Executar testes de módulos específicos
npm run test:modules
```

### Estrutura de testes

- `src/**/*.spec.ts` - Testes unitários
- `test/**/*.e2e-spec.ts` - Testes end-to-end

## 📦 Scripts disponíveis

- `npm run build` - Compila o projeto
- `npm run start` - Inicia a aplicação
- `npm run start:dev` - Inicia a aplicação em modo desenvolvimento
- `npm run start:debug` - Inicia a aplicação em modo debug
- `npm run start:prod` - Inicia a aplicação em modo produção
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código
- `npm run format:check` - Verifica a formatação do código
- `npm run test` - Executa os testes
- `npm run test:cov` - Executa os testes com cobertura
- `npm run test:e2e` - Executa os testes end-to-end
- `npm run docker:build` - Constrói as imagens Docker
- `npm run docker:up` - Inicia os containers
- `npm run docker:down` - Para os containers
- `npm run docker:dev` - Inicia os containers em modo desenvolvimento

## 🔄 CI/CD

O projeto utiliza GitHub Actions para CI/CD. O pipeline executa:

- Verificação de formatação do código
- Linting
- Build do projeto
- Testes unitários e de cobertura
- Geração de relatórios de teste

### Status do Pipeline

[![CI](https://github.com/seu-usuario/claude-sonnet-api/actions/workflows/ci.yml/badge.svg)](https://github.com/seu-usuario/claude-sonnet-api/actions/workflows/ci.yml)

## 📁 Estrutura do Projeto

```
src/
├── modules/
│   ├── produtos/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── entities/
│   │   └── dto/
│   └── pedidos/
│       ├── controllers/
│       ├── services/
│       ├── entities/
│       └── dto/
├── config/
├── middlewares/
└── scripts/
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
