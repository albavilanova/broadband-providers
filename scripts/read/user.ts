// READ OPERATION: Find users

import db from "../../src/db";
import { checkArgs } from "../../src/aux";

const [_bun, _script, ...args] = process.argv;

// Show all users
if (process.argv.length === 2) {
    const users = await db.user.findMany({});
    console.log("All users: \n", users);

// Show available users by condition
} else if (process.argv.length >= 3 && process.argv.length <= 9) {
    // Check which conditions have been passed through command line
    const conditions = checkArgs(["firstName", "lastName", "email", "organization", "position", 
                                  "startDate", "endDate"]);
    if (conditions) {
        
        // Create dates
        let startDate;
        let endDate;
        if (conditions.hasOwnProperty("startDate")) {
            startDate = new Date(conditions["startDate"]);
            console.log(`Start date converted to ${startDate}`);
        }
        if (conditions.hasOwnProperty("endDate")) {
            endDate = new Date(conditions["endDate"]);
            console.log(`End date converted to ${endDate}`);
        }
        
        // Find users
        const users = await db.user.findMany({
            where: {
                firstName: conditions["firstName"],
                lastName: conditions["lastName"],
                email: conditions["email"],
                organization: conditions["organization"],
                position: conditions["position"],
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
  
      if (users.length > 0) {
        console.log(`All users with required conditions: \n`, users);
      } else {
        console.log("No users were found");
      }
    }
// Return error if less than 2 or more than 9 arguments have been passed
} else {
    console.error(
      "Usage: bun user.ts --firstName=<firstName> --lastName=<lastName> --email=<email> --organization=<organization> --position=<position> --startDate=<startDate>  --endDate=<endDate>"
    );
    process.exit(1);
}