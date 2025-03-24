# API de Gerenciamento de Pedidos

API REST desenvolvida com NestJS para gerenciamento de produtos e pedidos, utilizando PostgreSQL como banco de dados.

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

## 📋 Sobre o Projeto

Esta API foi desenvolvida para gerenciar produtos e pedidos, oferecendo funcionalidades como:
- Cadastro e gerenciamento de produtos
- Criação e acompanhamento de pedidos
- Documentação automática com Swagger
- Testes automatizados
- CI/CD com GitHub Actions

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) - Framework Node.js para construção de aplicações escaláveis
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [TypeORM](https://typeorm.io/) - ORM para TypeScript
- [Swagger](https://swagger.io/) - Documentação da API
- [Docker](https://www.docker.com/) - Containerização da aplicação
- [Jest](https://jestjs.io/) - Framework de testes
- [GitHub Actions](https://github.com/features/actions) - CI/CD

## 📋 Pré-requisitos
Antes de começar, você precisa ter instalado em sua máquina o Docker

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/thalesmacedo1/theta-backend-api.git
cd theta-backend-api
```

## 🚀 Executando o Projeto
### Usando Docker

1. Construa e inicie os containers:
```bash
# Construir as imagens
npm run docker:build

# Iniciar os containers
npm run docker:up
```

## 📚 Documentação da API

A documentação da API está disponível através do Swagger UI em:
```
http://localhost:3000/docs
```

## 🧪 Testes
### Executando os Testes

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:cov

# Executar testes end-to-end
npm run test:e2e
```

### Estrutura de Testes

- `src/**/*.spec.ts` - Testes unitários
- `test/**/*.e2e-spec.ts` - Testes end-to-end
- `src/test/setup.ts` - Configuração global dos testes

### Relatórios de Teste

Os relatórios de teste são gerados em:
- Cobertura de código: `coverage/`
- Relatórios JUnit: `coverage/junit/`

## 📦 Scripts Disponíveis

### Desenvolvimento
- `npm run start:dev` - Inicia a aplicação em modo desenvolvimento
- `npm run start:prod` - Inicia a aplicação em modo produção

### Qualidade de Código
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código
- `npm run format:check` - Verifica a formatação do código

### Testes
- `npm test` - Executa os testes
- `npm run test:cov` - Executa os testes com cobertura
- `npm run test:ci` - Executa os testes no ambiente de CI

### Docker
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
