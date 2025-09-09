import { createClient } from 'redis';
import {RedisStore} from 'connect-redis';

// Cria o cliente Redis
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Trata erros do Redis
redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

// Conecta ao Redis (faça isso apenas uma vez, normalmente ao iniciar a app)
await redisClient.connect();

// Cria a store Redis para sessões
export const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:", // Opcional: prefixo para chaves no Redis [citation:8]
});

export default redisClient;