// CREATE OPERATION: Create a new product

import db from "../../src/db";

// Get args from command line
if (process.argv.length !== 8) {
  console.error(
    "Usage: bun scripts/create/product.ts <providerName> <name> <variables> <startDate> <endDate> <formats>"
  );
  process.exit(1);
}
const [_bun, _script, ...args] = process.argv;

// Store product in db
try {

  // Get arguments from command line
  const [providerName, name, variables, startDate, endDate, formats] =
    args;

  // Get provider
  const provider = await db.provider.findUnique({
    where: {
      name: providerName,
    },
  });

  if (provider !== null) {
    // Convert strings to string arrays
    const variablesArray = variables.split(',').map((str) => str.trim());
    const formatsArray = formats.split(',').map((str) => str.trim());
    
    // Create dates
    const startDateJS = new Date(startDate);
    console.log(`Start date converted to ${startDateJS}`);
    const endDateJS = new Date(endDate);
    console.log(`End date converted to ${endDateJS}`);

    // Create new product
    const newProduct = await db.product.create({
      data: {
        name,
        variables: variablesArray,
        startDate: startDateJS,
        endDate: endDateJS,
        formats: formatsArray,
        providerId: provider.providerId,
      },
    });
    console.log("You created a new product: \n", newProduct);
  } else {
    console.error(`Provider ${providerName} does not exist.`);
  }
} catch (e) {
  console.error(`There was an error creating the product: ${e}`);
}
