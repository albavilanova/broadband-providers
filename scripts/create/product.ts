// CREATE OPERATION: Create a new product

import db from "../../src/db";
import { checkArgs } from "../../src/main";

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
  // Check which conditions have been passed through command line
  const args = [
    "providerName",
    "name",
    "variables",
    "startDate",
    "endDate",
    "formats",
  ];
  const conditions = checkArgs(args);
  console.log(args);
  args.some(function (arg, index) {
    console.log(arg);
    if (!conditions.hasOwnProperty(arg)) {
      console.error(`Product ${arg} must be passed`);
      process.exit(1);
    }
  });

  // Get provider
  const provider = await db.provider.findUnique({
    where: {
      name: conditions["providerName"],
    },
  });

  if (provider !== null) {
    // Convert strings to string arrays
    const variablesArray = conditions["variables"]
      .split(",")
      .map((str) => str.trim());
    const formatsArray = conditions["formats"]
      .split(",")
      .map((str) => str.trim());

    // Create dates
    const startDateJS = new Date(conditions["startDate"]);
    console.log(`Start date converted to ${startDateJS}`);
    const endDateJS = new Date(conditions["endDate"]);
    console.log(`End date converted to ${endDateJS}`);

    // Create new product
    const newProduct = await db.product.create({
      data: {
        name: conditions["name"],
        variables: variablesArray,
        startDate: startDateJS,
        endDate: endDateJS,
        formats: formatsArray,
        providerId: provider.providerId,
      },
    });
    console.log("You created a new product: \n", newProduct);
  } else {
    console.error(`Provider ${conditions["providerName"]} does not exist.`);
  }
} catch (e) {
  console.error(`There was an error creating the product: ${e}`);
}
