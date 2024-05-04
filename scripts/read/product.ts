// READ OPERATION: Find products

import db from "../../src/db";
import { getProductsByArgs } from "../../src/main";

const [_bun, _script, ...args] = process.argv;

// Show all products
if (process.argv.length === 2) {
  const products = await db.product.findMany({});
  console.log("All products: \n", products);

// Show available products by condition
} else if (process.argv.length >= 3 && process.argv.length <= 8) {
  const products = await getProductsByArgs();
  if (products.length > 0) {
    console.log(`All products with required conditions: \n`, products);
  } else {
    console.log("No products were found");
  }

// Return error if less than 2 or more than 8 arguments have been passed
} else {
  console.error(
    "Usage: bun scripts/read/product.ts --name=<name> --providerName=<providerName> --variables=<variables> --startDate=<startDate> --endDate=<endDate> --formats<formats>"
  );
  process.exit(1);
}
