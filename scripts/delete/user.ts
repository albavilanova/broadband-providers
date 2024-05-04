// DELETE OPERATION: Delete users

import db from "../../src/db";
import { getUsersByArgs } from "../../src/main";

const [_bun, _script, ...args] = process.argv;

// Delete all users
if (process.argv.length === 2) {
    const users = await db.user.deleteMany({});
    if (users.count > 0) {
        console.log(`All users (${users.count}) have been deleted`);
    } else {
        console.error("There are no users to delete");
    }

// Delete users by condition
} else if (process.argv.length >= 3 && process.argv.length <= 9) {
    const users = await getUsersByArgs();
    if (users.length > 0) {
      for (const user of users) {
        try {
          await db.user.delete({
            where: {
              userId: user.userId,
            },
          });
        } catch (e) {
          console.error(
            `There was an error deleting the user with ID ${user.userId}`
          );
        }
      }
    } else {
      console.error("There are no users to delete with these conditions");
    }

// Return error if less than 2 or more than 9 arguments have been passed
} else {
    console.error(
      "Usage: bun scripts/delete/user.ts --firstName=<firstName> --lastName=<lastName> --email=<email> --organization=<organization> --position=<position> --startDate=<startDate>  --endDate=<endDate>"
    );
    process.exit(1);
  }
  