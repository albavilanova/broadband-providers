# Database model

Based on three entities, this database model is based on a schema that could be used to obtain information on different weather data providers.

## Initialization

Create and run the Postgres container by using:

```
docker compose -f compose.yml up
```

Get the container ID (hash) of the running container by: 
``` 
docker ps -a
```

And proceed to inspect it to find the corresponding IP address:
```
docker inspect <hash>
```

Create an .env file containing:

```
DATABASE_URL="postgresql://postgres-user:postgres-password@<IP-address>:5432/postgres"
```

And start:
```
docker start <hash>
``` 

Install the dependencies, generate and push the schema and seed the database: 

```
bun install
bunx prisma generate
bunx prisma db push
bunx prisma db seed
```

You can now check its content easily with:

```
bunx prisma studio
```

## Scripts to test CRUD operations:

### Create

**Create a new user**

```
bun run scripts/create/new-user.ts <first-name> <last-name> <organization> <position> <email>
```

**Create a new provider**

```
bun run scripts/create/new-provider.ts <name> <headquarters> <url>
```

### Read

**Find products**

To find all products:
```
bun run scripts/find-products.ts
```

To find all products by provider
```
bun run scripts/read/find-products.ts <provider>
```