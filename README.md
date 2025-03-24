# API de Gerenciamento de Pedidos

API REST desenvolvida com NestJS para gerenciamento de produtos e pedidos, utilizando PostgreSQL como banco de dados.

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

## 📋 Sobre o Projeto

Esta API foi desenvolvida para gerenciar produtos e pedidos, oferecendo funcionalidades como:
- Cadastro e gerenciamento de produtos
- Criação e acompanhamento de pedidos
- Controle de estoque automático
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

Antes de começar, você precisa ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) versão 20.x ou superior
- [PostgreSQL](https://www.postgresql.org/) versão 16.x ou superior
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (opcional)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/thalesmacedo1/theta-backend-api.git
cd theta-backend-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações
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

## 🚀 Executando o Projeto

### Desenvolvimento Local

1. Inicie o PostgreSQL:
```bash
# Usando Docker
docker-compose up postgres -d

# Ou inicie seu PostgreSQL local
```

2. Crie o banco de dados:
```bash
npm run db:create
```

3. Inicie a aplicação em modo desenvolvimento:
```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000`

### Usando Docker

1. Construa e inicie os containers:
```bash
# Construir as imagens
npm run docker:build

# Iniciar os containers
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

### Configuração do Ambiente de Testes

1. Configure as variáveis no arquivo `.env.example`:
```env
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=theta_db

# Application
PORT=3001
NODE_ENV=test
```

### Executando os Testes

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:cov

# Executar testes em modo watch (útil durante o desenvolvimento)
npm run test:watch

# Executar testes de módulos específicos
npm run test:modules

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
- `npm run start:debug` - Inicia a aplicação em modo debug
- `npm run start:prod` - Inicia a aplicação em modo produção

### Qualidade de Código
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código
- `npm run format:check` - Verifica a formatação do código

### Testes
- `npm test` - Executa os testes
- `npm run test:cov` - Executa os testes com cobertura
- `npm run test:e2e` - Executa os testes end-to-end
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

### Status do Pipeline

[![CI](https://github.com/thalesmacedo1/theta-backend-api/actions/workflows/ci.yml/badge.svg)](https://github.com/thalesmacedo1/theta-backend-api/actions/workflows/ci.yml)

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

## 👥 Autores

- **Seu Nome** - *Trabalho Inicial* - [thalesmacedo1](https://github.com/thalesmacedo1)

## 🙏 Agradecimentos

- NestJS Team
- TypeORM Team
- PostgreSQL Team
- Docker Team