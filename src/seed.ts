import { DataSource } from 'typeorm';
import { Product } from './products/entities/product.entity';
import 'dotenv/config';

export async function runSeed() {
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Product],
    synchronize: false,
  });

  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(Product);

  const count = await repo.count();
  if (count > 0) {
    console.log('Seed já executado. Ignorando.');
    await AppDataSource.destroy();
    return;
  }

  const products = [
    { descripton: 'Camiseta Azul', price: 59.9, sku: 'SKU001' },
    { descripton: 'Calça Jeans', price: 129.9, sku: 'SKU002' },
    { descripton: 'Tênis Esportivo', price: 249.9, sku: 'SKU003' },
    { descripton: 'Mochila Escolar', price: 89.9, sku: 'SKU004' },
    { descripton: 'Relógio Digital', price: 199.9, sku: 'SKU005' },
    { descripton: 'Boné Preto', price: 39.9, sku: 'SKU006' },
    { descripton: 'Jaqueta de Couro', price: 349.9, sku: 'SKU007' },
    { descripton: 'Camisa Social', price: 99.9, sku: 'SKU008' },
    { descripton: 'Chinelo Conforto', price: 29.9, sku: 'SKU009' },
    { descripton: 'Carteira Masculina', price: 79.9, sku: 'SKU010' },
  ];

  await repo.save(products);
  console.log('Seed executado com sucesso.');

  await AppDataSource.destroy();
}
