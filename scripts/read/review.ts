// READ OPERATION: Find reviews

import db from "../../src/db";
import { checkArgs } from "../../src/aux";

const [_bun, _script, ...args] = process.argv;

// Show all reviews
if (process.argv.length === 2) {
    const reviews = await db.review.findMany({});
    console.log("All reviews: \n", reviews);

// Show available reviews by condition
} else if (process.argv.length >= 3 && process.argv.length <= 3) {
    // Check which conditions have been passed through command line
    const conditions = checkArgs(["rating"]);
    if (conditions) {
        
        // Get rating as int if it has been passed
        const rating = parseInt(conditions["rating"]);

        // Find reviews
        const reviews = await db.review.findMany({
            where: {
                rating: rating,
            },
        });
  
      if (reviews.length > 0) {
        console.log(`All reviews with required conditions: \n`, reviews);
      } else {
        console.log("No reviews were found");
      }
    }
// Return error if less than 2 or more than 3 arguments have been passed
} else {
    console.error(
      "Usage: bun review.ts --rating=<rating>"
    );
    process.exit(1);
}
