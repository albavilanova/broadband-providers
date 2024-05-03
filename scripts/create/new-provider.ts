// CREATE OPERATION: Create a new provider
// Run using bun run new-provider.ts <name> <headquarters> <url>

import db from "../db";

// Get args from command line
if (process.argv.length < 5) {
  console.error("Usage: bun new-provider.ts <name> <headquarters> <url>");
  process.exit(1);
}
const [_bun, _script, ...args] = process.argv;

// Store user in db
try {
  const [name, headquarters, url] = args;
  const newProvider = await db.provider.create({
    data: {
      name,
      headquarters,
      url,
    },
  });
  console.log("You created a new provider:", newProvider);
} catch (e) {
  console.error(`There was an error creating the provider: ${e}`);
}
