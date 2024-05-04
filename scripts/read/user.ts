// READ OPERATION: Find users

import db from "../../src/db";
import { getUsersByArgs } from "../../src/main";

const [_bun, _script, ...args] = process.argv;

// Show all users
if (process.argv.length === 2) {
  const users = await db.user.findMany({});
  console.log("All users: \n", users);

  // Show available users by condition
} else if (process.argv.length >= 3 && process.argv.length <= 9) {
  const users = await getUsersByArgs();
  if (users.length > 0) {
    console.log(`All users with required conditions: \n`, users);
  } else {
    console.log("No users were found");
  }

  // Return error if less than 2 or more than 9 arguments have been passed
} else {
  console.error(
    "Usage: bun user.ts --firstName=<firstName> --lastName=<lastName> --email=<email> --organization=<organization> --position=<position> --startDate=<startDate>  --endDate=<endDate>"
  );
  process.exit(1);
}
