// DELETE OPERATION: Delete reviews

import db from "../../src/db";
import { checkArgs } from "../../src/aux";

const [_bun, _script, ...args] = process.argv;

// Delete all reviews
if (process.argv.length === 2) {
    const reviews = await db.review.deleteMany({});
    if (reviews.count > 0) {
        console.log(`All reviews (${reviews.count}) have been deleted`);
    } else {
        console.error("There are no reviews to delete");
    }
}