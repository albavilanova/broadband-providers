// DELETE OPERATION: Delete products

import db from "../../src/db";
import { getProductsByArgs } from "../../src/main";

const [_bun, _script, ...args] = process.argv;

// Delete all products
if (process.argv.length === 2) {
  const products = await db.product.deleteMany({});
  if (products.count > 0) {
    console.log(`All products (${products.count}) have been deleted`);
  } else {
    console.error("There are no products to delete");
  }

// Delete products by condition
} else if (process.argv.length >= 3 && process.argv.length <= 5) {
  const products = await getProductsByArgs();
  if (products.length > 0) {
    for (const product of products) {
      try {
        await db.product.delete({
          where: {
            productId: product.productId,
          },
        });
      } catch (e) {
        console.error(
          `There was an error deleting the product with ID ${product.productId}`
        );
      }
    }
  } else {
    console.error("There are no products to delete with these conditions");
  }

// Return error if less than 2 or more than 5 arguments have been passed
} else {
    console.error(
      "Usage: bun scripts/delete/product.ts --name=<name> --providerName=<providerName>  --variables=<variables>"
    );
    process.exit(1);
}  