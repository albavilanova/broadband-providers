// READ OPERATION: Find reviews

import db from "../../src/db";
import { getReviewsByArgs } from "../../src/main";

const [_bun, _script, ...args] = process.argv;

// Show all reviews
if (process.argv.length === 2) {
  const reviews = await db.review.findMany({});
  console.log("All reviews: \n", reviews);

// Show available reviews by condition
} else if (process.argv.length >= 3 && process.argv.length <= 3) {
  const reviews = await getReviewsByArgs();
  if (reviews.length > 0) {
    console.log(`All reviews with required conditions: \n`, reviews);
  } else {
    console.log("No reviews were found");
  }

// Return error if less than 2 or more than 3 arguments have been passed
} else {
  console.error("Usage: bun scripts/read/review.ts --rating=<rating>");
  process.exit(1);
}
