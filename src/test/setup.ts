import { config } from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
config({ path: '.env' });

// Configura o timeout global para os testes
jest.setTimeout(10000);

// Limpa todos os mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
});
