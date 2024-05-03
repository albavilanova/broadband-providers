// CREATE OPERATION: Create a new product
// Run using bun run new-product.ts <providerName> <name> <variables> <startDate> <endDate> <formats>

import db from "../db";

// Get args from command line
if (process.argv.length !== 8) {
  console.error(
    "Usage: bun new-product.ts <providerName> <name> <variables> <startDate> <endDate> <formats>"
  );
  process.exit(1);
}
const [_bun, _script, ...args] = process.argv;

// Store product in db
try {
  const [providerName, name, variables, startDate, endDate, formats] =
    args;
  const provider = await db.provider.findUnique({
    where: {
      name: providerName,
    },
  });
  if (provider !== null) {
    // Convert strings to string arrays
    const variablesArray = Array.isArray(variables) ? variables : [variables];
    const formatsArray = Array.isArray(formats) ? formats : [formats];

    // Create new product
    const newProduct = await db.product.create({
      data: {
        name,
        variables: variablesArray,
        startDate,
        endDate,
        formats: formatsArray,
        providerId: provider.providerId,
      },
    });
    console.log("You created a new product:", newProduct);
  } else {
    console.log(`Provider ${providerName} does not exist.`);
  }
} catch (e) {
  console.error(`There was an error creating the product: ${e}`);
}
