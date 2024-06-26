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
bun run scripts/create/user.ts --firstName=<first-name> --lastName=<last-name> --organization=<organization> --position=<position> --email=<email>
```

Example:

```
bun run scripts/create/user.ts --firstName=Miguel --lastName="Villarino" --organization=Amrum --position="Senior researcher" --email=miguel.villarino@amrum.com
```

**Create a new provider**

Usage:

```
bun run scripts/create/provider.ts --name=<name> --headquarters=<headquarters> --url=<url>
```

Example:

```
bun run scripts/create/provider.ts --name=Meteomatics --headquarters=Switzerland --url=https://www.meteomatics.com/
```

**Create a new product**

Usage:

```
bun run scripts/create/product.ts --providerName=<providerName> --name=<name> --variables=<variables> --startDate=<startDate> --endDate=<endDate> --formats=<formats>
```

Example:

```
bun run scripts/create/product.ts --providerName=CustomWeather --name="Wind atlas" --variables="wind speed, wind direction" --startDate=2019-01-01 --endDate=2020-12-31 --formats=csv
```

**Create a new review**

Usage:

```
bun run scripts/create/review.ts --productName=<productName> --email=<email> --title=<title> --rating=<rating> --message=<message>
```

Example:

```
bun run scripts/create/review.ts --productName="U.S. Air Quality Forecasts" --email=david.gomez@gmail.com --title="Excellent dataset" --rating=8 --message="Very useful, it would be better if more variables were included"
```

### 2. Read

**Find users**

To get all users:

```
bun run scripts/read/user.ts
```

To get users by specific conditions:

```
bun run scripts/read/user.ts --firstName=<firstName> --lastName=<lastName> --email=<email> --organization=<organization> --position=<position> --startDate=<startDate>  --endDate=<endDate>
```

Examples:

```
bun run scripts/read/user.ts --email=david.gomez@gmail.com
bun run scripts/read/user.ts --position="Research engineer"
bun run scripts/read/user.ts --firstName=Alba --lastName=Vilanova --organization=BSC
bun run scripts/read/user.ts --startDate=2024-05-01 --endDate=2024-05-31
```

**Find providers**

To get all providers:

```
bun run scripts/read/provider.ts
```

To get providers by specific conditions:

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

To get products by specific conditions:

```
bun run scripts/read/product.ts --name=<name> --providerName=<providerName> --variables=<variables> --startDate=<startDate> --endDate=<endDate> --formats<formats>
```

Examples:

```
bun run scripts/read/product.ts --name="U.S. Air Quality Forecasts"
bun run scripts/read/product.ts --providerName=CustomWeather
bun run scripts/read/product.ts --variables="wind speed, wind direction"
bun run scripts/read/product.ts --providerName=CustomWeather --variables=aqi
bun run scripts/read/product.ts --startDate=2009-01-01 --formats=csv
```

**Find reviews**

To get all reviews:

```
bun run scripts/read/review.ts
```

To get reviews by specific conditions:

Example:

```
bun run scripts/read/review.ts --rating=10
```

### 3. Update

Use the read functions to get the entity IDs before using the update functions. The `id` and at least one more parameter must be passed through the command line.

**Update users**

To update a user:

```
bun run scripts/update/user.ts --id=<id> --firstName=<firstName> --lastName=<lastName> --email=<email> --organization=<organization> --position=<position>
```

Example:

```
bun run scripts/update/user.ts --id=clvshhrc80000109ucw0uwbm2 --organization=Ayala --position="Senior web developer"
```

**Update providers**

To update a provider:

```
bun run scripts/update/provider.ts --id=<id> --name=<name> --headquarters=<headquarters>
```

Example:

```
bun run scripts/update/provider.ts --id=2 --headquarters=Spain
```

**Update products**

To update a product:

```
bun run scripts/update/product.ts --id=<id> --name=<name> --providerName=<providerName> --variables=<variables> --startDate=<startDate> --endDate=<endDate> --formats<formats>
```

Example:

```
bun run scripts/update/product.ts --id=2 --startDate=2015-06-01 --variables="nitrogen dioxide, methane" --formats="grib, netcdf"
```

**Update reviews**

To update a review:

```
bun run scripts/update/review.ts --id=<id> --rating=<rating> --title=<title> --message=<message>
```

Example:

```
bun run scripts/update/review.ts --rating=5 --id=1 --message="I have noticed that the data have wrong units" --title="Wrong units"
```

### 4. Delete

The delete functions work in the same fashion as the read functions. Once the conditions have been used to filter the data, the resulting entries will be deleted.

**Delete users**

To delete all users:

```
bun run scripts/delete/user.ts
```

To delete users by specific conditions:

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

To delete providers by specific conditions:

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

To delete products by specific conditions:

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

To delete reviews by specific conditions:

```
bun run scripts/delete/product.ts --rating=<rating>
```

Example:

```
bun run scripts/delete/review.ts --rating=10
```
