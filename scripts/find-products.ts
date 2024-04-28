// READ OPERATION: Find products
// To find all products: bun run find-products.ts
// To find all products by provider: bun run find-products.ts <provider>

import db from "./db";

const [_bun, _script, ...args] = process.argv;

// Show available products
if (process.argv.length === 2) {
    const products = await db.product.findMany({
        select: {
            name: true,
        },
    });
    console.log("All products:", products);
    
// Show available products by provider
} else if (process.argv.length === 3) {
    const [name] = args;
    const provider = await db.provider.findUnique({
        where: {
            name
        }
    })
    if (provider) {
        const products = await db.product.findMany({
            select: {
                name: true,
            },
            where: {
                provider
            }
        });
        console.log(`All products by ${name}:`, products);
    } else {
        console.log(`No products found for ${name}`);
    }

// Return error if more than 1 arg has been passed
} else {
    console.error("Usage: bun find-products.ts <provider>");
    process.exit(1);
}