// CREATE OPERATION: Create a new user

import db from "../../src/db";
import { checkArgs } from "../../src/main";

// Get args from command line
if (process.argv.length !== 7) {
  console.error(
    "Usage: bun scripts/create/user.ts <first-name> <last-name> <organization> <position> <email>"
  );
  process.exit(1);
}
const [_bun, _script, ...args] = process.argv;

// Store user in db
try {
  // Check which conditions have been passed through command line
  const args = ["firstName", "lastName", "organization", "position", "email"];
  const conditions = checkArgs(args);
  console.log(args);
  args.some(function (arg, index) {
    console.log(arg);
    if (!conditions.hasOwnProperty(arg)) {
      console.error(`User ${arg} must be passed`);
      process.exit(1);
    }
  });

  // Create new user
  const newUser = await db.user.create({
    data: {
      firstName: conditions["firstName"],
      lastName: conditions["lastName"],
      position: conditions["position"],
      organization: conditions["organization"],
      email: conditions["email"],
    },
  });
  console.log("You created a new user: \n", newUser);
} catch (e) {
  console.error(`There was an error creating the user: ${e}`);
}
