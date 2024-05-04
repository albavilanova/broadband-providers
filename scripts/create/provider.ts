// CREATE OPERATION: Create a new provider

import db from "../../src/db";

// Get args from command line
if (process.argv.length !== 5 ) {
  console.error("Usage: bun provider.ts <name> <headquarters> <url>");
  process.exit(1);
}
const [_bun, _script, ...args] = process.argv;

// Store provider in db
try {
  const [name, headquarters, url] = args;

  // Create new provider
  const newProvider = await db.provider.create({
    data: {
      name,
      headquarters,
      url,
    },
  });
  console.log("You created a new provider: \n", newProvider);
} catch (e) {
  console.error(`There was an error creating the provider: ${e}`);
}
