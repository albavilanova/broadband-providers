// DELETE OPERATION: Delete products

import db from "../../src/db";
import { checkArgs } from "../../src/aux";

const [_bun, _script, ...args] = process.argv;

// Delete all products
if (process.argv.length === 2) {
    const products = await db.product.deleteMany({});
    if (products.count > 0) {
        console.log(`All products (${products.count}) have been deleted`);
    } else {
        console.error("There are no products to delete");
    }
}