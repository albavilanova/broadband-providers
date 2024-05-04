# Weather Data Providers Database

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

This will create two data providers - one with one product and another one with two - two users and a review for one of the datasets.

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
bun run scripts/create/user.ts Miguel Villarino Amrum "Senior researcher" miguel.villarino@amrum.com
```

**Create a new provider**

Usage:

```
bun run scripts/create/provider.ts <name> <headquarters> <url>
```

Example:

```
bun run scripts/create/provider.ts Meteomatics Switzerland https://www.meteomatics.com/
```

**Create a new product**

Usage:

```
bun run scripts/create/product.ts <providerName> <name> <variables> <startDate> <endDate> <formats>
```

Example:

```
bun run scripts/create/product.ts CustomWeather "Wind atlas" "wind speed, wind direction" 2019-01-01 2020-12-31 csv
```

**Create a new review**

Usage:

```
bun run scripts/create/review.ts <productName> <email> <title> <rating> <message>
```

Example:

```
bun run scripts/create/review.ts "U.S. Air Quality Forecasts" david.gomez@gmail.com "Excellent dataset" 8 "Very useful, it would be better if more variables were included"
```

### 2. Read

**Find users**

To get all users:

```
bun run scripts/read/user.ts
```

To get users by specific conditions (optional):

```
bun run scripts/read/user.ts --firstName=<firstName> --lastName=<lastName> --email=<email> --organization=<organization> --position=<position> --startDate=<startDate>  --endDate=<endDate>
```

Examples:
```
bun run scripts/read/user.ts --email=david.gomez@gmail.com
bun run scripts/read/user.ts --position="Research engineer"
bun run scripts/read/user.ts --firstName=Alba --lastName=Vilanova --organization=BSC
bun run scripts/read/user.ts --startDate=2024-05-01  --endDate=2024-05-31
```

**Find providers**

To get all providers:

```
bun run scripts/read/provider.ts 
```

To get providers by specific conditions (optional):

```
bun run scripts/read/provider.ts --name=<name> --headquarters=<headquarters>
```

Examples:
```
bun run scripts/read/provider.ts --name="CustomWeather"
bun run scripts/read/provider.ts --headquarters="Czech Republic"
```

**Find products**

To get all products:

```
bun run scripts/read/product.ts
```

To get products by specific conditions (optional):

```
bun run scripts/read/product.ts --name=<name> --providerName=<providerName> --variables=<variables>
```

Examples:
```
bun run scripts/read/product.ts --name="U.S. Air Quality Forecasts"
bun run scripts/read/product.ts --providerName="CustomWeather"
bun run scripts/read/product.ts --variables="wind speed, wind direction"
bun run scripts/read/product.ts --providerName="CustomWeather" --variables="aqi"
```

**Find reviews**

To get all reviews:

```
bun run scripts/read/review.ts
```

To get reviews by specific conditions (optional):

Example:
```
bun run scripts/read/review.ts --rating=10
```

### 3. Update

**Update users**
```
bun run scripts/update/user.ts
```

**Update providers**

```
bun run scripts/update/provider.ts
```

**Update products**

```
bun run scripts/update/product.ts
```

**Update reviews**

```
bun run scripts/update/review.ts
```

### 4. Delete

**Delete users**

To delete all users:

```
bun run scripts/delete/user.ts
```

**Delete providers**

To delete all providers:

```
bun run scripts/delete/provider.ts
```

**Delete products**

To delete all products:

```
bun run scripts/delete/product.ts
```

**Delete reviews**

To delete all reviews:

```
bun run scripts/delete/review.ts
```