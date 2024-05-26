// UPDATE OPERATION: Update user

import db from "../../src/db";
import { checkArgs } from "../../src/main";

const [_bun, _script, ...args] = process.argv;

// Return error if less than 4 arguments have been passed
if (process.argv.length < 4) {
  console.error("The id and at least one more parameter must be passed");
  process.exit(1);

// Update user by id
} else {
  // Check which conditions have been passed through command line
  const conditions = checkArgs([
    "id",
    "firstName",
    "lastName",
    "email",
    "organization",
    "position",
  ]);

  if (!conditions.hasOwnProperty("id")) {
    console.error("User id must be passed");
    process.exit(1);
  }
  // Check if user exists
  const user = await db.user.findUnique({
    where: {
      userId: conditions["id"],
    },
  })

  if (user !== null) {
    await db.user.update({
      where: {
        userId: conditions["id"],
      },
      data: {
        firstName: conditions["firstName"],
        lastName: conditions["lastName"],
        email: conditions["email"],
        organization: conditions["organization"],
        position: conditions["position"]
      },
    });
    var msg = `User with id ${conditions["id"]} has changed with this input: \n`
    console.log(msg, conditions);
  } else {
    console.error(`User does not exist in database`)
  }
}
