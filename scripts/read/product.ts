// READ OPERATION: Find products
// To find all products: bun run product.ts --all
// To find specific products (optional args): bun run product.ts --name=<name> --providerName=<providerName> --variables=<variables>

import db from "../../src/db";
import { checkArgs } from "../../src/aux";

const [_bun, _script, ...args] = process.argv;

// Show available products
if (process.argv.includes("--all") || process.argv.length === 2) {
  const products = await db.product.findMany({});
  console.log("All products: \n", products);

// Show available products by condition
} else if (process.argv.length >= 3 && process.argv.length <= 5) {
  // Check which conditions have been passed through command line
  const conditions = checkArgs(["name", "providerName", "variables"]);
  if (conditions) {
    // Get provider if it has been passed
    let provider;
    if (conditions.hasOwnProperty("providerName")) {
      provider = await db.provider.findUnique({
        where: {
          name: conditions["providerName"],
        },
      });
      if (provider === null) {
        console.error(`Provider does not exist in database`);
        process.exit(1);
      }
    }

    // Get variables as string array is they have been passed
    let variablesArray: string[] = [];
    if (conditions.hasOwnProperty("variables")) {
      variablesArray = conditions["variables"]
        .split(",")
        .map((str) => str.trim());
    }

    // Find products
    const products = await db.product.findMany({
      where: {
        name: conditions["name"],
        provider: provider,
        variables:
          variablesArray.length > 0 ? { hasEvery: variablesArray } : undefined,
      },
    });

    if (products.length > 0) {
      console.log(`All products with required conditions: \n`, products);
    } else {
      console.log("No products were found");
    }
  }

// Return error if less than 2 or more than 5 arguments have been passed
} else {
  console.error(
    "Usage: bun product.ts --name=<name> --providerName=<providerName>  --variables=<variables>"
  );
  process.exit(1);
}
