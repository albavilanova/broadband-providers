# Database model

Based on three entities, this database model is based on a schema that could be used to obtain information on different weather data providers.

Scripts to test CRUD operations:

**Create a new user**

```
bun run new-user.ts <first-name> <last-name> <organization> <position> <emails>
```

**Find products**

To find all products:
```
bun run find-products.ts
```

To find all products by provider
```
bun run find-products.ts <provider>
```