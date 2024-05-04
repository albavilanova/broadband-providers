// DELETE OPERATION: Delete users

import db from "../../src/db";
import { checkArgs } from "../../src/aux";

const [_bun, _script, ...args] = process.argv;

// Delete all users
if (process.argv.length === 2) {
    const users = await db.user.deleteMany({});
    if (users.count > 0) {
        console.log(`All users (${users.count}) have been deleted`);
    } else {
        console.error("There are no users to delete");
    }
}