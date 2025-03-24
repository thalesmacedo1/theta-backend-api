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

# API de Gerenciamento de Pedidos e Produtos

Esta é uma API RESTful para gerenciamento de pedidos e produtos, desenvolvida com NestJS, seguindo os princípios SOLID e boas práticas de desenvolvimento.

## Implementação

### Tecnologias utilizadas

- Node.js
- NestJS
- TypeORM
- PostgreSQL
- Class Validator
- TypeScript

### Arquitetura

O projeto segue uma arquitetura modular e em camadas, aplicando os princípios SOLID:

- **Single Responsibility Principle**: Cada classe tem uma única responsabilidade.
- **Open/Closed Principle**: As entidades estão abertas para extensão, mas fechadas para modificação.
- **Liskov Substitution Principle**: Os tipos derivados podem substituir seus tipos base.
- **Interface Segregation Principle**: As interfaces são específicas para os clientes.
- **Dependency Inversion Principle**: Depende de abstrações, não de implementações concretas.

### Estrutura do projeto

```
src/
├── config/
│   └── database.config.ts
├── modules/
│   ├── produtos/
│   │   ├── controllers/
│   │   │   └── produto.controller.ts
│   │   ├── dto/
│   │   │   ├── create-produto.dto.ts
│   │   │   └── update-produto.dto.ts
│   │   ├── entities/
│   │   │   └── produto.entity.ts
│   │   ├── repositories/
│   │   │   └── produto.repository.ts
│   │   ├── services/
│   │   │   └── produto.service.ts
│   │   └── produtos.module.ts
│   └── pedidos/
│       ├── controllers/
│       │   └── pedido.controller.ts
│       ├── dto/
│       │   └── create-pedido.dto.ts
│       ├── entities/
│       │   ├── pedido.entity.ts
│       │   └── pedido-produto.entity.ts
│       ├── repositories/
│       │   └── pedido.repository.ts
│       ├── services/
│       │   └── pedido.service.ts
│       └── pedidos.module.ts
├── scripts/
│   └── create-database.ts
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── main.ts
```

### Fluxo de funcionamento

1. **Criação de Produtos**:
   - O cliente envia uma requisição POST para `/produtos` com os dados do produto.
   - O controller recebe a requisição e passa para o service.
   - O service valida os dados e chama o repository para criar o produto no banco de dados.
   - O repository salva os dados e retorna o produto criado.
   - O controller retorna a resposta ao cliente.

2. **Criação de Pedidos**:
   - O cliente envia uma requisição POST para `/pedidos` com os produtos e quantidades.
   - O service verifica se há estoque disponível para cada produto.
   - Se houver estoque, o pedido é criado com status "Pendente".
   - Se o pedido for marcado como "Concluído", o estoque é automaticamente decrementado.
   - O pedido é salvo no banco de dados e retornado ao cliente.

3. **Atualização de Status de Pedido**:
   - O cliente envia uma requisição PATCH para `/pedidos/:id/status` com o novo status.
   - Se o status for alterado para "Concluído", o estoque é decrementado.
   - O pedido atualizado é retornado ao cliente.

## Funcionalidades

### Produtos

- Criar produtos
- Listar todos os produtos
- Buscar produto por ID
- Atualizar produto
- Deletar produto

### Pedidos

- Criar pedidos (com verificação de estoque)
- Listar todos os pedidos
- Buscar pedido por ID
- Atualizar status do pedido (Pendente, Concluído, Cancelado)
- Atualização automática do estoque quando um pedido é concluído

## Configuração

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure o arquivo `.env` com as informações do banco de dados:
   ```
   # Configurações do banco de dados
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=gerenciador_pedidos
   DB_SYNCHRONIZE=true

   # Configurações da aplicação
   PORT=3000
   ```
4. Crie o banco de dados:
   ```
   npm run db:create
   ```
5. Inicie o servidor:
   ```
   npm run start:dev
   ```

## Endpoints da API

### Produtos

- `POST /produtos` - Criar um novo produto
- `GET /produtos` - Listar todos os produtos
- `GET /produtos/:id` - Buscar produto por ID
- `PUT /produtos/:id` - Atualizar um produto
- `DELETE /produtos/:id` - Deletar um produto

### Pedidos

- `POST /pedidos` - Criar um novo pedido
- `GET /pedidos` - Listar todos os pedidos
- `GET /pedidos/:id` - Buscar pedido por ID
- `PATCH /pedidos/:id/status` - Atualizar status do pedido

## Exemplos de uso

### Criar um produto

```bash
curl -X POST http://localhost:3000/produtos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Produto Teste",
    "categoria": "Eletrônicos",
    "descricao": "Um produto de teste",
    "preco": 100.50,
    "quantidade_estoque": 10
  }'
```

### Criar um pedido

```bash
curl -X POST http://localhost:3000/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "produtoId": "id-do-produto",
        "quantidade": 2
      }
    ]
  }'
```
