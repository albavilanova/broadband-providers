// CREATE OPERATION: Create a new user
// Run using bun run user.ts <first-name> <last-name> <organization> <position> <email>

import db from "../../src/db";

// Get args from command line
if (process.argv.length !== 7) {
  console.error(
    "Usage: bun user.ts <first-name> <last-name> <organization> <position> <email>"
  );
  process.exit(1);
}
const [_bun, _script, ...args] = process.argv;

// Store user in db
try {
  // Get arguments from command line
  const [firstName, lastName, organization, position, email] = args;

  // Create new user
  const newUser = await db.user.create({
    data: {
      firstName,
      lastName,
      position,
      organization,
      email,
    },
  });
  console.log("You created a new user: \n", newUser);
} catch (e) {
  console.error(`There was an error creating the user: ${e}`);
}
