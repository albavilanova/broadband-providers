// CREATE OPERATION: Create a new provider

import db from "../../src/db";
import { checkArgs } from "../../src/main";

// Get args from command line
if (process.argv.length !== 5) {
  console.error(
    "Usage: bun scripts/create/provider.ts <name> <headquarters> <url>"
  );
  process.exit(1);
}
const [_bun, _script, ...args] = process.argv;

// Store provider in db
try {
  // Check which conditions have been passed through command line
  const args = ["name", "headquarters", "url"];
  const conditions = checkArgs(args);
  args.some(function (arg, index) {
    if (!conditions.hasOwnProperty(arg)) {
      console.error(`Provider ${arg} must be passed`);
      process.exit(1);
    }
  });

  // Create new provider
  const newProvider = await db.provider.create({
    data: {
      name: conditions["name"],
      headquarters: conditions["headquarters"],
      url: conditions["url"],
    },
  });
  console.log("You created a new provider: \n", newProvider);
} catch (e) {
  console.error(`There was an error creating the provider: ${e}`);
}
