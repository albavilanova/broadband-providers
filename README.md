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

Usage:

```
bun run scripts/create/user.ts <first-name> <last-name> <organization> <position> <email>
```

Example:

```
bun scripts/create/user.ts Miguel Villarino Amrum "Senior researcher" miguel.villarino@amrum.com
```

**Create a new provider**

Usage:

```
bun run scripts/create/provider.ts <name> <headquarters> <url>
```

Example:

```
bun scripts/create/provider.ts Meteomatics Switzerland https://www.meteomatics.com/
```

**Create a new product**

Usage:

```
bun scripts/create/product.ts <providerName> <name> <variables> <startDate> <endDate> <formats>
```

Example:

```
bun scripts/create/product.ts CustomWeather "Wind atlas" "wind speed, wind direction" 2019-01-17T21:00:00.000Z 2019-01-17T21:00:00.000Z csv
```

**Create a new review**

Usage:

```
bun run scripts/create/review.ts <productName> <email> <title> <rating> <message>
```

Example:

```
bun scripts/create/review.ts "U.S. Air Quality Forecasts" david.gomez@gmail.com "Excellent dataset" 8 "Very useful, it would be better if more variables were included"
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
