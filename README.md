# Products API - Backend

API para gerenciamento de produtos, usando NestJS, TypeORM e PostgreSQL.

---

## Tecnologias
- NestJS
- TypeORM
- PostgreSQL (via Docker)

---

## Configuração

1. Clone o repositório e acesse a pasta do backend:
```bash
git clone https://github.com/joaolucassb/products-api
cd products-api
```

2. Crie arquivo .env com as variáveis:
```
DB_HOST=localhost
DB_PORT=5433       # Porta do container Docker PostgreSQL
DB_USERNAME=postgres
DB_PASSWORD=1234
DB_NAME=products
NODE_ENV=development
```
3. Suba o container Docker do banco:
```
docker run --name products-db -e POSTGRES_PASSWORD=1234 -e POSTGRES_DB=products -p 5433:5432 -d postgres:15
```

4. Instale dependências:
```
npm install
```

5. Rode a API em modo desenvolvimento:
```
npm run start:dev
```

---

A API estará em http://localhost:3000/products

# Endpoints
POST /products – Cria produto (name, price, sku)

GET /products – Lista produtos ordenados por nome

GET /products/:id – Produto específico

PUT /products/:id – Atualiza produto

DELETE /products/:id – Remove produto

Todos os produtos possuem o campo missingLetter (primeira letra do alfabeto ausente no nome).