import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function createDatabase() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
  });

  try {
    await client.connect();
    
    const checkResult = await client.query(`
      SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_DATABASE}'
    `);

    if (checkResult.rowCount === 0) {
      console.log(`Criando banco de dados "${process.env.DB_DATABASE}"...`);
      await client.query(`CREATE DATABASE ${process.env.DB_DATABASE}`);
      console.log(`Banco de dados "${process.env.DB_DATABASE}" criado com sucesso!`);
    } else {
      console.log(`Banco de dados "${process.env.DB_DATABASE}" já existe.`);
    }
  } catch (error) {
    console.error('Erro ao criar o banco de dados:', error);
  } finally {
    await client.end();
  }
}

createDatabase(); 