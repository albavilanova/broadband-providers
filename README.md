# Database model

Based on four entities, this database model is based on a simple schema that could be used to obtain information on different weather data providers.

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

### 1. Create

**Create a new user**

```
bun run scripts/create/new-user.ts <first-name> <last-name> <organization> <position> <email>
```

Example:

```
bun scripts/create/new-user.ts Miguel Villarino Amrum "Senior researcher" miguel.villarino@amrum.com
```

**Create a new provider**

```
bun run scripts/create/new-provider.ts <name> <headquarters> <url>
```

Example:

```
bun scripts/create/new-provider.ts Meteomatics Switzerland https://www.meteomatics.com/
```

**Create a new product**

```
bun scripts/create/new-product.ts <providerName> <name> <variables> <startDate> <endDate> <formats>
```

Example:

```
bun scripts/create/new-product.ts CustomWeather "Wind atlas" "['Wind speed', 'Wind direction']" 2019-01-17T21:00:00.000Z 2019-01-17T21:00:00.000Z csv
```

### 2. Read

**Find products**

To find all products:
```
bun run scripts/find-products.ts
```

To find all products by provider
```
bun run scripts/read/find-products.ts <provider>
```

### 3. Update

### 4. Delete
