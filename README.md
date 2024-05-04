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

You can now check its content with:

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

Use the read functions to get the entity IDs before using the update functions. The parameter `id` and at least one more must be passed.

**Update users**

To update a user:

```
bun run scripts/update/user.ts --id=<userId> --firstName=<firstName> --lastName=<lastName> --email=<email> --organization=<organization> --position=<position>
```

**Update providers**

To update a provider:

```
bun run scripts/update/provider.ts --id=<providerId> --name=<name> --headquarters=<headquarters>
```

**Update products**

To update a product:

```
bun run scripts/update/product.ts --id=<productId> --name=<name> --providerName=<providerName> --variables=<variables>
```

**Update reviews**

To update a review:

```
bun run scripts/update/review.ts --id=<reviewId> --rating=<rating> --title=<title> --message=<message>
```

### 4. Delete

The delete functions work in the same fashion as the read functions. Once the conditions have been used to filter the data, the resulting entries will be deleted.

**Delete users**

To delete all users:

```
bun run scripts/delete/user.ts
```

To delete users by specific conditions (optional):

```
bun run scripts/delete/user.ts --firstName=<firstName> --lastName=<lastName> --email=<email> --organization=<organization> --position=<position> --startDate=<startDate>  --endDate=<endDate>
```

Examples:
```
bun run scripts/delete/user.ts --email=david.gomez@gmail.com
bun run scripts/delete/user.ts --position="Research engineer"
bun run scripts/delete/user.ts --firstName=Alba --lastName=Vilanova --organization=BSC
bun run scripts/delete/user.ts --startDate=2024-05-01  --endDate=2024-05-31
```

**Delete providers**

To delete all providers:

```
bun run scripts/delete/provider.ts
```

To delete providers by specific conditions (optional):

```
bun run scripts/delete/provider.ts --name=<name> --headquarters=<headquarters>
```

Examples:
```
bun run scripts/delete/provider.ts --name="CustomWeather"
bun run scripts/delete/provider.ts --headquarters="Czech Republic"
```

**Delete products**

To delete all products:

```
bun run scripts/delete/product.ts
```

To delete products by specific conditions (optional):

```
bun run scripts/delete/product.ts --name=<name> --providerName=<providerName> --variables=<variables>
```

Examples:
```
bun run scripts/delete/product.ts --name="U.S. Air Quality Forecasts"
bun run scripts/delete/product.ts --providerName="CustomWeather"
bun run scripts/delete/product.ts --variables="wind speed, wind direction"
bun run scripts/delete/product.ts --providerName="CustomWeather" --variables="aqi"
```

**Delete reviews**

To delete all reviews:

```
bun run scripts/delete/review.ts
```

To delete reviews by specific conditions (optional):

```
bun run scripts/delete/product.ts --rating=<rating>
```

Example:
```
bun run scripts/delete/review.ts --rating=10
```