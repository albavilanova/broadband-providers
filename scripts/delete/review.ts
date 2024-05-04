// DELETE OPERATION: Delete reviews

import db from "../../src/db";
import { getReviewsByArgs } from "../../src/main";

const [_bun, _script, ...args] = process.argv;

// Delete all reviews
if (process.argv.length === 2) {
    const reviews = await db.review.deleteMany({});
    if (reviews.count > 0) {
        console.log(`All reviews (${reviews.count}) have been deleted`);
    } else {
        console.error("There are no reviews to delete");
    }

// Delete reviews by condition
} else if (process.argv.length >= 3 && process.argv.length <= 3) {
    const reviews = await getReviewsByArgs();
    if (reviews.length > 0) {
      for (const review of reviews) {
        try {
          await db.review.delete({
            where: {
              reviewId: review.reviewId,
            },
          });
          console.log(`Review with ID ${review.reviewId} was successfully deleted`)
        } catch (e) {
          console.error(
            `There was an error deleting the review with ID ${review.reviewId}`
          );
        }
      }
    } else {
      console.error("There are no reviews to delete with these conditions");
    }

// Return error if less than 2 or more than 3 arguments have been passed
} else {
    console.error("Usage: bun scripts/delete/review.ts --rating=<rating>");
    process.exit(1);
}